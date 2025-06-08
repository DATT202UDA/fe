'use client';

import { useState, useRef, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUserCircle,
  FaStar,
  FaCircle,
  FaHistory,
  FaPlus,
  FaTrash,
  FaChevronRight,
  FaArrowLeft,
} from 'react-icons/fa';
import Image from 'next/image';
import ChatService from '../../services/ChatService';
import ReactMarkdown from 'react-markdown';
import SesstionChatService from '@/services/SesstionChatService';
import { useSession } from 'next-auth/react';
import MessageService from '@/services/MessageService';
import { toast } from 'react-hot-toast';

export enum Flag {
  BEST_SELLING = 'best_selling',
  TOP_RATED = 'top_rated',
  // FEATURED = "featured",
}

const LoadingDots = () => (
  <div className="flex items-center gap-1">
    <span
      className="w-2 h-2 bg-[#B86B2B] rounded-full animate-bounce"
      style={{ animationDelay: '0ms' }}
    ></span>
    <span
      className="w-2 h-2 bg-[#B86B2B] rounded-full animate-bounce"
      style={{ animationDelay: '150ms' }}
    ></span>
    <span
      className="w-2 h-2 bg-[#B86B2B] rounded-full animate-bounce"
      style={{ animationDelay: '300ms' }}
    ></span>
  </div>
);

const Message = ({ message }: { message: Message }) => {
  return (
    <div
      key={message._id}
      className={`flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      } mb-2`}
    >
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 ${
          message.sender === 'user'
            ? 'bg-[#E6A15A] text-white'
            : 'bg-white shadow-sm border border-gray-100 text-gray-800'
        }`}
      >
        {message.sender === 'bot' ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <div className="my-2">
                    <img
                      {...props}
                      className="rounded-lg w-full max-w-[180px] h-auto object-cover shadow-sm hover:shadow transition-shadow duration-300"
                      loading="lazy"
                    />
                  </div>
                ),

                a: ({ node, children, href, ...props }) => {
                  // Kiểm tra nếu là link sản phẩm
                  const isProductLink = href?.includes('/san-pham/');
                  // Kiểm tra nếu là link xem chi tiết
                  const isViewDetailLink = children
                    ?.toString()
                    .includes('Xem chi tiết');

                  if (isProductLink && !isViewDetailLink) {
                    return (
                      <div className="bg-[#FDFBF8] p-3 rounded-lg border border-[#E6A15A]/10 hover:border-[#E6A15A]/30 shadow-sm hover:shadow transition-all duration-300 mb-3">
                        <a
                          href={href}
                          {...props}
                          className="text-[#5C3D2E] hover:text-[#B86B2B] font-medium no-underline text-base"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      </div>
                    );
                  }

                  if (isViewDetailLink) {
                    return (
                      <a
                        href={href}
                        {...props}
                        className="inline-flex items-center gap-1 text-[#B86B2B] hover:text-[#E6A15A] transition-colors no-underline text-sm font-medium mt-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    );
                  }

                  return (
                    <a
                      href={href}
                      {...props}
                      className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
                p: ({ node, children, ...props }) => {
                  // Kiểm tra nếu paragraph chứa hình ảnh
                  const hasImage = Children.toArray(children).some(
                    (child: any) => child?.type?.name === 'img',
                  );

                  return (
                    <p
                      {...props}
                      className={`${
                        hasImage ? 'my-2' : 'mb-2 last:mb-0'
                      } leading-relaxed text-sm`}
                    >
                      {children}
                    </p>
                  );
                },
                strong: ({ node, ...props }) => (
                  <strong {...props} className="font-medium text-[#5C3D2E]" />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-base font-semibold text-[#5C3D2E] mb-2"
                  >
                    {props.children}
                  </h3>
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="space-y-1 my-2 list-none pl-0" />
                ),
                li: ({ node, ...props }) => (
                  <li
                    {...props}
                    className="flex items-baseline gap-1.5 text-gray-600 text-sm"
                  >
                    <span className="text-[#E6A15A] text-xs">•</span>
                    <span>{props.children}</span>
                  </li>
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    {...props}
                    className="my-3 border-t border-[#E6A15A]/10"
                  />
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm">{message.text}</p>
        )}
        <div
          className={`text-[10px] mt-1 ${
            message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const STORAGE_KEY = 'chat_history';
const MAX_HISTORY = 10; // Số lượng cuộc trò chuyện tối đa được lưu

interface ChatHistory {
  id: string;
  messages: any[];
  createdAt: Date;
  preview: string;
}

interface Message {
  _id: string;
  session_id: string;
  sender: 'user' | 'bot';
  text: string;
  type: string;
  is_markdown: boolean;
  flag: Flag | null;
  reply_to: Message | null;
  timestamp: string;
  metadata: any;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botTyping, setBotTyping] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>(
    new Date().getTime().toString(),
  );

  const session = useSession();

  const [sesstionChat, setSesstionChat] = useState<string>();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const history = JSON.parse(stored);
      setChatHistory(
        history.map((h: any) => ({
          ...h,
          createdAt: new Date(h.createdAt),
        })),
      );
    }
  }, []);

  useEffect(() => {
    if (session.status !== 'authenticated') return;

    const fetchSesstionChat = async () => {
      try {
        const existing = localStorage.getItem('chat_session_id') || '';
        console.log(existing, 'existing');
        if (existing !== 'null' && existing !== 'undefined' && existing) {
          setSesstionChat(existing);
        } else {
          console.log('create new session');
          const { data } = await SesstionChatService.createSesstionChat();

          if (data && data._id) {
            localStorage.setItem('chat_session_id', data._id);
            setSesstionChat(data._id);
          }
        }
      } catch (error) {
        console.error('Error fetching session chat:', error);
      }
    };

    fetchSesstionChat();
  }, [session]);

  useEffect(() => {
    if (!sesstionChat) return;

    const fetchMessages = async () => {
      try {
        //loading
        setIsLoading(true);
        const { data } = await MessageService.getMessages(sesstionChat);
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
        } else {
          // If no messages, set default welcome message
          setMessages([
            {
              _id: '1',
              session_id: sesstionChat,
              sender: 'bot',
              text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
              type: 'text',
              is_markdown: false,
              flag: null,
              reply_to: null,
              timestamp: new Date().toISOString(),
              metadata: null,
              created_at: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              __v: 0,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Có lỗi khi tải tin nhắn');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [sesstionChat]);

  // Save current chat to history when messages change
  useEffect(() => {
    if (messages.length > 1) {
      // Only save if there's more than welcome message
      const updatedHistory = [...chatHistory];
      const currentChatIndex = updatedHistory.findIndex(
        (h) => h.id === currentChatId,
      );

      const chatData = {
        id: currentChatId,
        messages: messages,
        createdAt: new Date(),
        preview: messages[messages.length - 1].text.slice(0, 50) + '...',
      };

      if (currentChatIndex !== -1) {
        updatedHistory[currentChatIndex] = chatData;
      } else {
        updatedHistory.unshift(chatData);
        // Keep only MAX_HISTORY most recent chats
        if (updatedHistory.length > MAX_HISTORY) {
          updatedHistory.pop();
        }
      }

      setChatHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    }
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, botTyping]);

  const handleTopProducts = async () => {
    setIsLoading(true);
    setBotTyping('');
    try {
      const res = await ChatService.sendMessage(
        'Top 10 sản phẩm bán chạy nhất',
        sesstionChat,
        Flag.BEST_SELLING,
      );

      const botMessage: Message = {
        _id: new Date().getTime().toString(),
        session_id: sesstionChat || '',
        sender: 'bot',
        text: res,
        type: 'text',
        is_markdown: true,
        flag: Flag.BEST_SELLING,
        reply_to: null,
        timestamp: new Date().toISOString(),
        metadata: null,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      setMessages([...messages, botMessage]);
    } catch (e: any) {
      const errorMessage: Message = {
        _id: new Date().getTime().toString(),
        session_id: sesstionChat || '',
        sender: 'bot',
        text:
          e.message || 'Có lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.',
        type: 'text',
        is_markdown: false,
        flag: null,
        reply_to: null,
        timestamp: new Date().toISOString(),
        metadata: null,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      setMessages([...messages, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleTopRated = async () => {
    setIsLoading(true);
    setBotTyping('');
    try {
      const res = await ChatService.sendMessage(
        '5 sản phẩm đánh giá cao nhất',
        sesstionChat,
        Flag.TOP_RATED,
      );

      const botMessage: Message = {
        _id: new Date().getTime().toString(),
        session_id: sesstionChat || '',
        sender: 'bot',
        text: res,
        type: 'text',
        is_markdown: true,
        flag: Flag.TOP_RATED,
        reply_to: null,
        timestamp: new Date().toISOString(),
        metadata: null,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      setMessages([...messages, botMessage]);
    } catch (e: any) {
      const errorMessage: Message = {
        _id: new Date().getTime().toString(),
        session_id: sesstionChat || '',
        sender: 'bot',
        text:
          e.message || 'Có lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.',
        type: 'text',
        is_markdown: false,
        flag: null,
        reply_to: null,
        timestamp: new Date().toISOString(),
        metadata: null,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      setMessages([...messages, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        _id: new Date().getTime().toString(),
        session_id: sesstionChat || '',
        sender: 'user',
        text: message,
        type: 'text',
        is_markdown: false,
        flag: null,
        reply_to: null,
        timestamp: new Date().toISOString(),
        metadata: null,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };

      setMessages([...messages, userMessage]);
      setIsLoading(true);
      setBotTyping('');
      const userMsg = message;
      setMessage('');

      try {
        if (!sesstionChat) {
          toast.error('Vui lòng tạo phiên trò chuyện trước khi gửi tin nhắn');
          return;
        }

        const res = await ChatService.sendMessage(userMsg, sesstionChat);

        const botMessage: Message = {
          _id: new Date().getTime().toString(),
          session_id: sesstionChat,
          sender: 'bot',
          text: res,
          type: 'text',
          is_markdown: /[!#\[\](){}*_`]/.test(res),
          flag: null,
          reply_to: userMessage,
          timestamp: new Date().toISOString(),
          metadata: null,
          created_at: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        };

        if (botMessage.is_markdown) {
          setMessages([...messages, userMessage, botMessage]);
        } else {
          let botMsg = '';
          for (let i = 0; i < res.length; i++) {
            botMsg += res[i];
            setBotTyping(botMsg);
            await new Promise((r) => setTimeout(r, 18));
          }
          setMessages([...messages, userMessage, botMessage]);
          setBotTyping('');
        }
      } catch (e: any) {
        const errorMessage: Message = {
          _id: new Date().getTime().toString(),
          session_id: sesstionChat || '',
          sender: 'bot',
          text: e.message || 'Có lỗi khi gửi tin nhắn. Vui lòng thử lại.',
          type: 'text',
          is_markdown: false,
          flag: null,
          reply_to: userMessage,
          timestamp: new Date().toISOString(),
          metadata: null,
          created_at: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0,
        };
        setMessages([...messages, userMessage, errorMessage]);
      }
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    // setCurrentChatId(new Date().getTime().toString());
    const welcomeMessage: Message = {
      _id: new Date().getTime().toString(),
      session_id: sesstionChat || '',
      sender: 'bot',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      type: 'text',
      is_markdown: false,
      flag: null,
      reply_to: null,
      timestamp: new Date().toISOString(),
      metadata: null,
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    // setMessages([welcomeMessage]);
    // setShowHistory(false);
    try {
      const { data } = await SesstionChatService.createSesstionChat();
      if (data && data._id) {
        localStorage.setItem('chat_session_id', data._id);
        setSesstionChat(data._id);
        setMessages([welcomeMessage]);
        setShowHistory(false);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
      toast.error('Có lỗi khi tạo phiên trò chuyện mới');
    }
  };

  const handleViewHistory = () => {
    setShowHistory(true);
  };

  const loadChatFromHistory = (chat: ChatHistory) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    setShowHistory(false);
  };

  const deleteFromHistory = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = chatHistory.filter((h) => h.id !== chatId);
    setChatHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#B86B2B]/80 backdrop-blur-md text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#E6A15A]/80 transition-colors duration-300 border border-white/30"
      >
        {isOpen ? (
          <FaTimes size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
        ) : (
          <FaComments size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed sm:absolute bottom-0 sm:bottom-20 right-0 sm:right-0 w-full sm:w-80 md:w-96 h-[calc(100vh-80px)] sm:h-[500px] bg-white/60 backdrop-blur-xl border border-white/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all flex flex-col"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
          >
            {showHistory ? (
              <>
                {/* History View */}
                <div className="bg-[#B86B2B]/80 backdrop-blur-md text-white p-3 sm:p-4 flex items-center justify-between rounded-t-3xl">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {/* back */}
                    <button
                      onClick={() => setShowHistory(false)}
                      className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <FaArrowLeft size={14} />
                    </button>
                    Lịch sử trò chuyện
                  </h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#F5E9DA]/60 to-white/80">
                  {chatHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <FaHistory className="text-4xl mb-3 opacity-50" />
                      <p className="text-sm">Chưa có lịch sử trò chuyện</p>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {chatHistory.map((chat) => (
                        <motion.div
                          key={chat.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-3 shadow-sm hover:shadow transition-all cursor-pointer border border-gray-100"
                          onClick={() => loadChatFromHistory(chat)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {chat.preview}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(chat.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <button
                                onClick={(e) => deleteFromHistory(chat.id, e)}
                                className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                title="Xóa"
                              >
                                <FaTrash size={12} />
                              </button>
                              <FaChevronRight
                                className="text-gray-300"
                                size={14}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Normal Chat View */}
                {/* Chat Header */}
                <div className="bg-[#B86B2B]/80 backdrop-blur-md text-white p-3 sm:p-4 flex items-center justify-between rounded-t-3xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-sm sm:text-base">
                      Chat với chúng tôi
                    </h3>
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNewChat}
                        className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                        title="Cuộc trò chuyện mới"
                      >
                        <FaPlus size={14} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleViewHistory}
                        className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                        title="Lịch sử chat"
                      >
                        <FaHistory size={14} />
                      </motion.button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    title="Đóng"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-[#F5E9DA]/60 to-white/80 transition-all">
                  {messages.map((msg) => (
                    <Message key={msg._id} message={msg} />
                  ))}
                  {/* Hiệu ứng bot đang trả lời kiểu chat gpt */}
                  {botTyping && (
                    <div className="flex items-end gap-2 justify-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B86B2B]/90 text-white border border-white/50 shadow">
                          <FaRobot size={20} />
                        </div>
                      </div>
                      <div className="max-w-[80%] rounded-2xl p-2 sm:p-3 transition-all duration-200 shadow-md bg-white/80 text-gray-800 border border-[#B86B2B]/10">
                        <p className="text-xs sm:text-sm whitespace-pre-line">
                          {botTyping}
                          <span className="animate-pulse">▋</span>
                        </p>
                      </div>
                    </div>
                  )}
                  {isLoading && !botTyping && (
                    <div className="flex items-end gap-2 justify-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B86B2B]/90 text-white border border-white/50 shadow">
                          <FaRobot size={20} />
                        </div>
                      </div>
                      <div className="max-w-[80%] rounded-2xl p-2 sm:p-3 transition-all duration-200 shadow-md bg-white/80 text-gray-800 border border-[#B86B2B]/10">
                        <LoadingDots />
                      </div>
                    </div>
                  )}
                  {/* Show buttons after bot response or at start */}
                  {((messages.length === 1 && !isLoading && !botTyping) ||
                    (messages.length > 1 &&
                      !isLoading &&
                      !botTyping &&
                      messages[messages.length - 1].sender === 'bot')) && (
                    <div className="flex flex-col gap-2 justify-center mt-4">
                      <button
                        onClick={handleTopProducts}
                        className="bg-[#B86B2B]/90 hover:bg-[#E6A15A]/90 text-white text-sm py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 border border-white/20 backdrop-blur-sm"
                      >
                        <FaRobot size={16} className="animate-bounce" />
                        Top 10 sản phẩm bán chạy nhất
                      </button>
                      <button
                        onClick={handleTopRated}
                        className="bg-[#5C3D2E]/90 hover:bg-[#7A5C3E]/90 text-white text-sm py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 border border-white/20 backdrop-blur-sm"
                      >
                        <FaStar size={16} className="text-yellow-300" />5 sản
                        phẩm đánh giá cao nhất
                      </button>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="border-t border-white/30 bg-white/60 backdrop-blur-md p-3 sm:p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && handleSendMessage()
                      }
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 border border-[#B86B2B]/20 rounded-full px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-[#B86B2B] bg-white/70 backdrop-blur placeholder:text-gray-400 transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#B86B2B]/90 text-white p-2 rounded-full flex items-center justify-center hover:bg-[#E6A15A]/90 transition-colors duration-300 shadow-md"
                      style={{ width: 36, height: 36 }}
                    >
                      <FaPaperPlane
                        size={16}
                        className="sm:w-5 sm:h-5 w-4 h-4"
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;

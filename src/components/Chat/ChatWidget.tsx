'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaHistory,
  FaPlus,
  FaTrash,
  FaChevronRight,
  FaArrowLeft,
  FaStar,
} from 'react-icons/fa';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import LoadingDots from './LoadingDots';
import MessageMarkdown from './Message';

// Services
import ChatService from '@/services/ChatService';
import SesstionChatService from '@/services/SesstionChatService';
import MessageService from '@/services/MessageService';

// Types
export enum Flag {
  BEST_SELLING = 'best_selling',
  TOP_RATED = 'top_rated',
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

interface ChatHistory {
  id: string;
  messages: Message[];
  createdAt: Date;
  preview: string;
}

const STORAGE_KEY = 'chat_history';
const MAX_HISTORY = 10; // Số lượng cuộc trò chuyện tối đa được lưu

const ChatWidget = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: new Date().getTime().toString(),
      session_id: '1',
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
  const [isLoading, setIsLoading] = useState(false);
  const [botTyping, setBotTyping] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [sesstionChat, setSesstionChat] = useState<string>();

  const session = useSession();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, botTyping]);

  useEffect(() => {
    if (session.status !== 'authenticated') return;

    const fetchSesstionChat = async () => {
      try {
        const existing = localStorage.getItem('chat_session_id') || '';
        if (existing !== 'null' && existing !== 'undefined' && existing) {
          setSesstionChat(existing);
        } else {
          const { data } = await SesstionChatService.createSesstionChat();
          if (data && data._id) {
            localStorage.setItem('chat_session_id', data._id);
            setSesstionChat(data._id);
          }
        }
      } catch (error) {
        console.error('Error fetching session chat:', error);
        toast.error('Có lỗi khi tạo phiên trò chuyện');
      }
    };
    fetchSesstionChat();
  }, [session]);

  useEffect(() => {
    if (!sesstionChat) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const { data } = await MessageService.getMessages(sesstionChat);
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
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

  // Handlers
  const handleNewChat = async () => {
    if (session.status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

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
    if (session.status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }
    setShowHistory(true);
  };

  const handleTopProducts = async () => {
    if (session.status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopRated = async () => {
    if (session.status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (session.status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

    if (!message.trim()) return;

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
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatFromHistory = (chat: ChatHistory) => {
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
          <FaRobot size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
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
                  <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                    <button
                      onClick={() => setShowHistory(false)}
                      className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <FaArrowLeft size={14} />
                    </button>
                    Lịch sử trò chuyện
                  </h3>
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
                    <MessageMarkdown key={msg._id} message={msg} />
                  ))}
                  {/* Bot typing effect */}
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
                  {/* Loading indicator */}
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
                  {/* Quick action buttons */}
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

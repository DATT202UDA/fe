'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUserCircle,
} from 'react-icons/fa';
import Image from 'next/image';
import ChatService from '../../services/ChatService';

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

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [botTyping, setBotTyping] = useState('');

  const chatEndRef = useRef<HTMLDivElement | null>(null);

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
      );
      let botMsg = '';
      for (let i = 0; i < res.length; i++) {
        botMsg += res[i];
        setBotTyping(botMsg);
        await new Promise((r) => setTimeout(r, 18));
      }
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: res,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setBotTyping('');
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text:
            e.message || 'Có lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setBotTyping('');
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: 'user',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(true);
      setBotTyping('');
      const userMsg = message;
      setMessage('');
      try {
        const res = await ChatService.sendMessage(userMsg);
        // Render kiểu chat gpt: hiện dần từng ký tự
        let botMsg = '';
        for (let i = 0; i < res.length; i++) {
          botMsg += res[i];
          setBotTyping(botMsg);
          // delay nhỏ để tạo hiệu ứng
          await new Promise((r) => setTimeout(r, 18));
        }
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: res,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
        setBotTyping('');
      } catch (e: any) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: e.message || 'Có lỗi khi gửi tin nhắn. Vui lòng thử lại.',
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
        setBotTyping('');
      }
      setIsLoading(false);
    }
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
            {/* Close button for mobile */}
            <button
              className="absolute top-3 right-3 sm:hidden z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
            >
              <FaTimes size={20} className="text-[#B86B2B]" />
            </button>
            {/* Chat Header */}
            <div className="bg-[#B86B2B]/80 backdrop-blur-md text-white p-3 sm:p-4 flex flex-col rounded-t-3xl">
              <h3 className="font-semibold text-sm sm:text-base">
                Chat với chúng tôi
              </h3>
              <p className="text-xs sm:text-sm opacity-80">Hỗ trợ 24/7</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-[#F5E9DA]/60 to-white/80 transition-all">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.sender === 'user'
                      ? 'justify-end flex-row-reverse'
                      : 'justify-start'
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {msg.sender === 'user' ? (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B86B2B]/90 text-white border border-white/50 shadow">
                        <FaUserCircle size={20} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B86B2B]/90 text-white border border-white/50 shadow">
                        <FaRobot size={20} />
                      </div>
                    )}
                  </div>
                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl p-2 sm:p-3 transition-all duration-200 shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#B86B2B]/90 text-white'
                        : 'bg-white/80 text-gray-800 border border-[#B86B2B]/10'
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{msg.text}</p>
                    <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
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
              {/* Only show Top 10 button at the bottom if only welcome message exists */}
              {messages.length === 1 && !isLoading && !botTyping && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleTopProducts}
                    className="bg-[#B86B2B]/90 hover:bg-[#E6A15A]/90 text-white text-sm py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 animate-pulse border border-white/20 backdrop-blur-sm"
                  >
                    <FaRobot size={16} className="animate-bounce" />
                    Top 10 sản phẩm bán chạy nhất
                  </button>
                </div>
              )}
              {/* Show Top 10 button after bot response */}
              {messages.length > 1 &&
                !isLoading &&
                !botTyping &&
                messages[messages.length - 1].sender === 'bot' && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleTopProducts}
                      className="bg-[#B86B2B]/90 hover:bg-[#E6A15A]/90 text-white text-sm py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 animate-pulse border border-white/20 backdrop-blur-sm"
                    >
                      <FaRobot size={16} className="animate-bounce" />
                      Top 10 sản phẩm bán chạy nhất
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 border border-[#B86B2B]/20 rounded-full px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-[#B86B2B] bg-white/70 backdrop-blur placeholder:text-gray-400 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#B86B2B]/90 text-white p-2 rounded-full flex items-center justify-center hover:bg-[#E6A15A]/90 transition-colors duration-300 shadow-md"
                  style={{ width: 36, height: 36 }}
                >
                  <FaPaperPlane size={16} className="sm:w-5 sm:h-5 w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;

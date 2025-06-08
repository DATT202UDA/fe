import axiosInstance from '@/lib/axios';

enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

interface MessageData {
  session_id: string;
  sender: MessageSender;
  text: string;
  type: string;
  is_markdown: boolean;
}

class MessageService {
  static async createMessage(message: MessageData) {
    const response = await axiosInstance.post('/messages', message);
    return response.data;
  }

  static async getMessages(session_id: string) {
    const response = await axiosInstance.get(`/messages/${session_id}`);
    return response.data;
  }
}

export default MessageService;

import { Flag } from '@/components/Chat/ChatWidget';
import axiosInstance from '@/lib/axios';

class SesstionChatService {
  static async createSesstionChat() {
    const response = await axiosInstance.post('/sesstion-chat');
    return response.data;
  }
}

export default SesstionChatService;

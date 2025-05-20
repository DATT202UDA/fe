import axiosInstance from '@/lib/axios';

class ChatService {
  static async sendMessage(message: string) {
    try {
      console.log('Sending message:', message);

      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/openai/generate-content`,
        {
          prompt: message,
        },
      );

      console.log('Response received:', res.data);

      if (!res.data) {
        throw new Error('Không nhận được phản hồi từ server');
      }

      return res.data;
    } catch (error: any) {
      console.error('Chat Error Details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config,
      });

      // Kiểm tra các loại lỗi cụ thể
      if (error.response) {
        // Lỗi từ server (status code không phải 2xx)
        if (error.response.status === 401) {
          throw new Error(
            'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          );
        }
        if (error.response.status === 403) {
          throw new Error('Bạn không có quyền thực hiện hành động này.');
        }
        throw new Error(
          error.response.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
        );
      } else if (error.request) {
        // Không nhận được response
        throw new Error(
          'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
        );
      } else {
        // Lỗi khi setup request
        throw new Error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  }
}

export default ChatService;

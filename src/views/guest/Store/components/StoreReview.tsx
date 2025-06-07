import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import StoreService, { StoreReview as StoreReviewType } from '@/services/StoreService';
import { useInfo } from '@/contexts/InfoContext';

interface StoreReviewProps {
  storeId: string;
  onReviewAdded: () => void;
}

export default function StoreReview({ storeId, onReviewAdded }: StoreReviewProps) {
  const { userInfo } = useInfo();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    try {
      setIsSubmitting(true);
      await StoreService.createReview(storeId, { rating, comment });
      toast.success('Đánh giá thành công');
      setComment('');
      onReviewAdded();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Không thể gửi đánh giá');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#E6A15A]/10">
      <h2 className="text-2xl font-bold text-[#B86B2B] mb-6">Đánh giá cửa hàng</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-[#E6A15A]' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Nhận xét của bạn
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#E6A15A] focus:border-[#E6A15A]"
            placeholder="Chia sẻ trải nghiệm của bạn về cửa hàng..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E6A15A] text-white py-2 px-4 rounded-lg hover:bg-[#B86B2B] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>
    </div>
  );
} 
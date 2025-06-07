import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import StoreService, { StoreReview, PopulatedUser } from '@/services/StoreService';
import { useInfo } from '@/contexts/InfoContext';
import Image from 'next/image';

interface StoreReviewListProps {
  storeId: string;
}

export default function StoreReviewList({ storeId }: StoreReviewListProps) {
  const { userInfo } = useInfo();
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(userInfo?.id, 'userInfo.id');
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await StoreService.getStoreReviews(storeId, page);
      setReviews(response.reviews);
      setTotalPages(response.totalPages);
      console.log(response, 'response.reviews');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Không thể tải đánh giá');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [storeId, page]);


  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E6A15A]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào</p>
      ) : (
        reviews.map((review) => {
          const reviewer = review.user_id as PopulatedUser;
          const reviewDate = new Date(review.createdAt);

          return (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-[#E6A15A]/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={reviewer.avatar || '/images/default-avatar.png'}
                      alt={reviewer.full_name || 'Người dùng'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#B86B2B]">
                        {reviewer.username || 'Người dùng'}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-[#E6A15A]" />
                        <span className="text-sm text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {!isNaN(reviewDate.getTime())
                        ? reviewDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : 'Ngày không hợp lệ'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-[#E6A15A]/10 text-[#E6A15A] disabled:opacity-50"
          >
            Trước
          </button>
          <span className="px-4 py-2 text-gray-600">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-[#E6A15A]/10 text-[#E6A15A] disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
} 
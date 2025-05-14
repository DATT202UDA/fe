import { motion } from 'framer-motion';
import { FaTruck, FaShieldAlt, FaHeadset, FaCreditCard } from 'react-icons/fa';

const features = [
  {
    id: 1,
    icon: FaTruck,
    title: 'Giao hàng nhanh chóng',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 500.000đ',
  },
  {
    id: 2,
    icon: FaShieldAlt,
    title: 'Bảo hành chính hãng',
    description: 'Cam kết bảo hành từ 12-24 tháng cho mọi sản phẩm',
  },
  {
    id: 3,
    icon: FaHeadset,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn viên luôn sẵn sàng hỗ trợ',
  },
  {
    id: 4,
    icon: FaCreditCard,
    title: 'Thanh toán an toàn',
    description: 'Đa dạng phương thức thanh toán, bảo mật thông tin',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B86B2B] rounded-full flex items-center justify-center mb-4 md:mb-6">
                <feature.icon className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#7A5C3E] mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

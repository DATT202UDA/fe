'use client';

import { motion } from 'framer-motion';
import { FaStore, FaShieldAlt, FaUserShield, FaHandshake } from 'react-icons/fa';

const StoreTermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-[#E6A15A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaStore className="text-4xl text-[#E6A15A]" />
          </div>
          <h1 className="text-3xl font-bold text-[#9B7B5C] mb-4">
            Điều khoản và Điều kiện
          </h1>
          <p className="text-gray-600">
            Vui lòng đọc kỹ các điều khoản và điều kiện trước khi tạo cửa hàng
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8 space-y-8"
        >
          {/* Quy định chung */}
          <section>
            <h2 className="text-xl font-bold text-[#9B7B5C] mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-[#E6A15A]" />
              1. Quy định chung
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                1.1. Bằng việc tạo cửa hàng trên nền tảng của chúng tôi, bạn đồng ý tuân thủ tất cả các điều khoản và điều kiện được quy định trong tài liệu này.
              </p>
              <p>
                1.2. Chúng tôi có quyền thay đổi, bổ sung hoặc hủy bỏ bất kỳ điều khoản nào mà không cần thông báo trước.
              </p>
              <p>
                1.3. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi điều khoản được xem như bạn đã chấp nhận những thay đổi đó.
              </p>
            </div>
          </section>

          {/* Trách nhiệm của chủ cửa hàng */}
          <section>
            <h2 className="text-xl font-bold text-[#9B7B5C] mb-4 flex items-center gap-2">
              <FaUserShield className="text-[#E6A15A]" />
              2. Trách nhiệm của chủ cửa hàng
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                2.1. Cung cấp thông tin chính xác và đầy đủ khi đăng ký cửa hàng.
              </p>
              <p>
                2.2. Đảm bảo tính hợp pháp của các sản phẩm được bán trên cửa hàng.
              </p>
              <p>
                2.3. Xử lý đơn hàng và giao hàng đúng thời hạn đã cam kết.
              </p>
              <p>
                2.4. Bảo vệ quyền lợi của người tiêu dùng và giải quyết khiếu nại một cách nhanh chóng, hiệu quả.
              </p>
              <p>
                2.5. Tuân thủ các quy định về thuế và pháp luật hiện hành.
              </p>
            </div>
          </section>

          {/* Quy định về sản phẩm */}
          <section>
            <h2 className="text-xl font-bold text-[#9B7B5C] mb-4 flex items-center gap-2">
              <FaHandshake className="text-[#E6A15A]" />
              3. Quy định về sản phẩm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                3.1. Không được phép bán các sản phẩm cấm theo quy định của pháp luật.
              </p>
              <p>
                3.2. Cung cấp thông tin chính xác về sản phẩm, bao gồm giá cả, chất lượng, xuất xứ.
              </p>
              <p>
                3.3. Đảm bảo sản phẩm đúng với mô tả và hình ảnh đã đăng.
              </p>
              <p>
                3.4. Có chính sách đổi trả và bảo hành rõ ràng cho sản phẩm.
              </p>
            </div>
          </section>

          {/* Xử lý vi phạm */}
          <section>
            <h2 className="text-xl font-bold text-[#9B7B5C] mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-[#E6A15A]" />
              4. Xử lý vi phạm
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                4.1. Chúng tôi có quyền tạm ngưng hoặc chấm dứt hoạt động của cửa hàng nếu phát hiện vi phạm.
              </p>
              <p>
                4.2. Các hành vi vi phạm nghiêm trọng sẽ bị xử lý theo quy định của pháp luật.
              </p>
              <p>
                4.3. Chúng tôi không chịu trách nhiệm về các thiệt hại phát sinh do vi phạm điều khoản.
              </p>
            </div>
          </section>

          {/* Liên hệ */}
          <section>
            <h2 className="text-xl font-bold text-[#9B7B5C] mb-4 flex items-center gap-2">
              <FaHandshake className="text-[#E6A15A]" />
              5. Liên hệ
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Nếu bạn có bất kỳ thắc mắc nào về điều khoản và điều kiện, vui lòng liên hệ với chúng tôi qua:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: support@example.com</li>
                <li>Hotline: 1900-xxxx</li>
                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default StoreTermsPage; 
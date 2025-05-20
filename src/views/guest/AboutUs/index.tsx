import Image from 'next/image';
import {
  FaUsers,
  FaShoppingBag,
  FaHandshake,
  FaAward,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';

const AboutUsView = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-[#B86B2B] to-[#E6A15A]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Về GiaDụng
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Nơi kết nối người mua và người bán, mang đến trải nghiệm mua sắm
              gia dụng tiện nghi và đáng tin cậy
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div>
              <h2 className="text-3xl font-bold text-[#7A5C3E] mb-6">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-lg text-[#7A5C3E]/80 leading-relaxed">
                GiaDụng cam kết mang đến một nền tảng thương mại điện tử an
                toàn, minh bạch và hiệu quả cho người dùng. Chúng tôi không chỉ
                là nơi mua bán, mà còn là cầu nối giúp các sản phẩm gia dụng
                chất lượng đến gần hơn với người tiêu dùng.
              </p>
            </div>
            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#F5E9DA] p-6 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <FaUsers className="text-xl text-[#B86B2B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Lấy Khách Hàng Làm Trung Tâm
                </h3>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Đặt trải nghiệm và nhu cầu của khách hàng lên hàng đầu
                </p>
              </div>
              <div className="bg-[#F5E9DA] p-6 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <FaShoppingBag className="text-xl text-[#B86B2B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Chất Lượng Sản Phẩm
                </h3>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Cam kết cung cấp sản phẩm chất lượng, an toàn
                </p>
              </div>
              <div className="bg-[#F5E9DA] p-6 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <FaHandshake className="text-xl text-[#B86B2B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Minh Bạch & Tin Cậy
                </h3>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Xây dựng niềm tin qua sự minh bạch trong giao dịch
                </p>
              </div>
              <div className="bg-[#F5E9DA] p-6 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <FaAward className="text-xl text-[#B86B2B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Đổi Mới Liên Tục
                </h3>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Không ngừng cải tiến trải nghiệm mua sắm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-[#F5E9DA]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#7A5C3E] text-center mb-12">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <Image
                  src="/images/team/ceo.jpg"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#7A5C3E] mb-1">
                  Nguyễn Văn A
                </h3>
                <p className="text-[#B86B2B] font-medium mb-3">CEO & Founder</p>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực thương mại điện tử
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <Image
                  src="/images/team/cto.jpg"
                  alt="CTO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#7A5C3E] mb-1">
                  Trần Thị B
                </h3>
                <p className="text-[#B86B2B] font-medium mb-3">CTO</p>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Chuyên gia công nghệ với nhiều năm kinh nghiệm phát triển nền
                  tảng
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <Image
                  src="/images/team/coo.jpg"
                  alt="COO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#7A5C3E] mb-1">
                  Lê Văn C
                </h3>
                <p className="text-[#B86B2B] font-medium mb-3">COO</p>
                <p className="text-[#7A5C3E]/80 text-sm">
                  Chuyên gia vận hành với kinh nghiệm quản lý chuỗi cung ứng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsView;

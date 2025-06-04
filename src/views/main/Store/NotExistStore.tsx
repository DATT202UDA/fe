import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
} from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import StoreService, { CreateStoreRequestDto } from '@/services/StoreService';

// Validation schema
const storeSchema = z.object({
  name: z
    .string()
    .min(3, 'Tên cửa hàng phải có ít nhất 3 ký tự')
    .max(50, 'Tên cửa hàng không được vượt quá 50 ký tự'),
  description: z
    .string()
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được vượt quá 500 ký tự'),
  address: z
    .string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,15}$/,
      'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại từ 10-15 chữ số, có thể bắt đầu bằng dấu +',
    ),
  email: z
    .string()
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự'),
  image_url: z.string().optional(),
});

type StoreFormData = z.infer<typeof storeSchema>;

const NotExistStore = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Kích thước ảnh không được vượt quá 2MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('File phải là ảnh');
        return;
      }

      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: StoreFormData) => {
    setLoading(true);

    try {
      let imageUrl: string | undefined;

      // Upload image if exists
      if (selectedFile) {
        const uploadResult = await StoreService.uploadImage(selectedFile);
        imageUrl = uploadResult.url;
      }

      // Create store request
      const response = await StoreService.createStoreRequest({
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        image_url: imageUrl,
      });

      toast.success(
        'Gửi yêu cầu tạo cửa hàng thành công! Vui lòng chờ admin duyệt.',
      );
      // Chuyển hướng đến trang xem trạng thái yêu cầu trong router (main)
      router.push(`/cua-hang/trang-thai/${response._id}`);
    } catch (error: any) {
      toast.error(
        error.message || 'Có lỗi xảy ra khi gửi yêu cầu tạo cửa hàng',
      );
    } finally {
      setLoading(false);
    }
  };

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
            Bạn chưa có cửa hàng nào
          </h1>
          <p className="text-gray-600 mb-4">
            Gửi yêu cầu tạo cửa hàng để bắt đầu kinh doanh
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-start">
              <FaInfoCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                Yêu cầu của bạn sẽ được admin xem xét và duyệt trong thời gian
                sớm nhất. Vui lòng cung cấp thông tin chính xác và đầy đủ.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#9B7B5C] mb-6">
                Thông tin cửa hàng
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên cửa hàng <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                        placeholder="Nhập tên cửa hàng của bạn"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả cửa hàng <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <textarea
                        {...field}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                        rows={4}
                        placeholder="Mô tả ngắn gọn về cửa hàng của bạn"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo cửa hàng
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <div
                    className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#E6A15A] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Store logo preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FaStore className="mx-auto text-gray-400 text-2xl" />
                        <span className="text-xs text-gray-500 mt-1 block">
                          Thêm logo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors"
                  >
                    Chọn ảnh
                  </button>
                  <p className="text-xs text-gray-500">
                    Kích thước tối đa: 2MB. Định dạng: JPG, PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-bold text-[#9B7B5C] mb-6">
                Thông tin liên hệ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaMapMarkerAlt className="inline-block mr-2 text-[#E6A15A]" />
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                          placeholder="Nhập địa chỉ cửa hàng"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="inline-block mr-2 text-[#E6A15A]" />
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="tel"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          Ví dụ: 0912345678 hoặc +1234567890
                        </p>
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope className="inline-block mr-2 text-[#E6A15A]" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="email"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                          placeholder="Nhập email liên hệ"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Nút gửi yêu cầu */}
            <div className="pt-6 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#E6A15A] hover:bg-[#F0B97A] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu tạo cửa hàng'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NotExistStore;

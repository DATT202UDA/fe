import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useState } from 'react';
import ShopService from '@/services/ShopService';

const storeSchema = z.object({
  name: z.string().min(1, 'Tên cửa hàng là bắt buộc'),
  description: z.string().min(1, 'Mô tả cửa hàng là bắt buộc'),
  address: z.string().min(1, 'Địa chỉ là bắt buộc'),
  phone: z.string().min(1, 'Số điện thoại là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  image: z.any().optional(),
});

type StoreFormData = z.infer<typeof storeSchema>;

interface EditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => Promise<void>;
  storeData: {
    _id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    image_url: string;
  };
  isLoading: boolean;
}

const EditStoreModal = ({
  isOpen,
  onClose,
  onSubmit,
  storeData,
  isLoading,
}: EditStoreModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: storeData.name,
      description: storeData.description,
      address: storeData.address,
      phone: storeData.phone,
      email: storeData.email,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#9B7B5C]">
                Chỉnh sửa thông tin cửa hàng
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên cửa hàng
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                    />
                  )}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                    />
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hình ảnh
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview || storeData.image_url}
                      alt={storeData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleImageChange(e);
                        }}
                        className="hidden"
                        id="store-image-upload"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('store-image-upload')?.click()
                    }
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors"
                  >
                    Thay đổi ảnh
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#E6A15A] text-white rounded-lg hover:bg-[#F0B97A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditStoreModal;

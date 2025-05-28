import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CategoryService, { Category } from '@/services/CategoryService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';

interface Product {
  name: string;
  price: string;
  image: File;
  categoryId: string;
  description?: string;
}

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  price: z
    .string()
    .min(1, 'Giá sản phẩm là bắt buộc')
    .refine((val) => !isNaN(Number(val)), 'Giá phải là số')
    .refine((val) => Number(val) > 0, 'Giá phải lớn hơn 0'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
  image: z.any().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { id: string; name: string }[];
  onSubmit?: (data: ProductFormData) => void;
  isLoading?: boolean;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSubmit,
  isLoading = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (!isOpen) {
      reset();
      setImagePreview(null);
      setSelectedFile(null);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (imageFile?.[0]) {
      const file = imageFile[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  if (!isOpen) return null;

  const onSubmitForm = (data: ProductFormData) => {
    if (!selectedFile) {
      toast.error('Vui lòng chọn hình ảnh sản phẩm');
      return;
    }

    const productData: ProductFormData = {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description || '',
      image: selectedFile,
    };
    onSubmit?.(productData);
  };

  return (
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
            Thêm sản phẩm mới
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                placeholder="Nhập tên sản phẩm"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                {...register('categoryId')}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
              <input
                {...register('price')}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                placeholder="Nhập giá sản phẩm"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả sản phẩm
            </label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
              rows={4}
              placeholder="Nhập mô tả sản phẩm"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh sản phẩm
            </label>
            <div className="mt-1 flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
                <input
                  {...register('image')}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <FaPlus className="mx-auto text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1 block">
                      Thêm ảnh
                    </span>
                  </div>
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  Xóa ảnh
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#E6A15A] text-white rounded-lg hover:bg-[#F0B97A] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang thêm...
                </>
              ) : (
                'Thêm sản phẩm'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddProductModal;

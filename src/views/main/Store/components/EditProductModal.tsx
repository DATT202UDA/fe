import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ShopService from '@/services/ShopService'; // Assuming ShopService is needed for image upload
import {
  Product as ProductType,
  UpdateProductDto,
} from '@/services/ProductService'; // Import Product and UpdateProductDto types

// Product Schema (Define locally or import if used elsewhere extensively)
const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  price: z
    .string()
    .min(1, 'Giá sản phẩm là bắt buộc')
    .refine((val) => !isNaN(Number(val.replace(/\./g, ''))), 'Giá phải là số')
    .refine((val) => Number(val.replace(/\./g, '')) > 0, 'Giá phải lớn hơn 0'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
  image: z.any().optional(),
  categoryId: z.string().min(1, 'Danh mục sản phẩm là bắt buộc'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface CategoryOption {
  id: string;
  name: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType | null;
  categories: CategoryOption[];
  onSubmit: (data: UpdateProductDto, file?: File) => Promise<void>; // Adjusted onSubmit to match update logic
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  categories,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image_url || null,
  ); // Manage image preview state locally
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // State to hold the selected image file

  // Effect to reset form and image preview when product prop changes
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        // Convert number price to string for form input, handle potential undefined/null
        price:
          product.price !== undefined && product.price !== null
            ? product.price.toLocaleString('en-US').replace(/,/g, '')
            : '',
        description: product.description || '',
        categoryId: product.category_id || '',
      });
      setImagePreview(product.image_url || null);
      setSelectedImageFile(null); // Reset selected file when product changes
    } else {
      // Reset when modal is closed or product becomes null
      reset();
      setImagePreview(null);
      setSelectedImageFile(null);
    }
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImageFile(null); // Clear selected file
      // If no new file is selected, keep the original preview if product exists
      setImagePreview(product?.image_url || null);
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    const updateData: UpdateProductDto = {
      name: data.name,
      price: Number(data.price.replace(/\./g, '')), // Remove dots for number conversion
      description: data.description || '',
      category_id: data.categoryId,
    };

    // If a new image file is selected, pass it to the onSubmit prop
    if (selectedImageFile) {
      await onSubmit(updateData, selectedImageFile);
    } else {
      // If no new image file, but there was an original image, keep the original image URL
      if (product?.image_url) {
        await onSubmit({ ...updateData, image_url: product.image_url });
      } else {
        // If no new image and no original image, submit without image_url
        await onSubmit(updateData);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
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
                Chỉnh sửa sản phẩm
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm
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
                    Giá
                  </label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                      />
                    )}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
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
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview || '/images/default-product.png'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="edit-image-upload"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('edit-image-upload')?.click()
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
                  className="px-4 py-2 bg-[#E6A15A] text-white rounded-lg hover:bg-[#F0B97A] transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;

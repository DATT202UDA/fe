'use client';

import { useState } from 'react';
import { FormInput } from '@/components/admin/common/FormInput';
import { FormTextarea } from '@/components/admin/common/FormTextarea';
import { FormImageUpload } from '@/components/admin/common/FormImageUpload';
import { Category, UpdateCategoryDto } from '@/types/category';
import CategoryService from '@/services/CategoryService';
import Image from 'next/image';

interface CategoryEditFormProps {
  category: Category;
  onSubmit: (data: FormData | Partial<UpdateCategoryDto>) => Promise<void>;
  isLoading: boolean;
}

export function CategoryEditForm({
  category,
  onSubmit,
  isLoading,
}: CategoryEditFormProps) {
  const [name, setName] = useState(category.name || '');
  const [description, setDescription] = useState(category.description || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(null);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Kiểm tra định dạng file
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        setError('Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif)');
        setImageFile(null);
        e.target.value = ''; // Reset input
        return;
      }
      setImageFile(file);
      setError(null);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    // Check if only text fields changed
    const textFieldsChanged =
      name.trim() !== category.name ||
      description.trim() !== (category.description || '');

    // Check file type if imageFile exists
    if (imageFile) {
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        setError('Chỉ chấp nhận file ảnh (jpg, jpeg, png, gif)');
        return;
      }
    }

    try {
      if (imageFile) {
        // If an image file is selected, send FormData with all fields including the image
        const formData = new FormData();
        formData.append('name', name.trim());
        if (description.trim()) {
          formData.append('description', description.trim());
        }
        formData.append('image', imageFile); // Ensure key is 'image'
        console.log(
          'Gửi request update category với FormData (bao gồm text và ảnh):',
          formData,
        );
        await onSubmit(formData);
      } else {
        // If no image file, send JSON with updated text fields
        const updateData: Partial<UpdateCategoryDto> = {
          name: name.trim(),
          description: description.trim() || undefined,
        };
        // Only include fields that have actually changed
        const changedData: Partial<UpdateCategoryDto> = {};
        if (updateData.name !== category.name)
          changedData.name = updateData.name;
        if (updateData.description !== (category.description || ''))
          changedData.description = updateData.description;

        if (Object.keys(changedData).length > 0) {
          console.log(
            'Gửi request update category với JSON data (chỉ text):',
            changedData,
          );
          await onSubmit(changedData);
        } else {
          console.log('Không có thay đổi text fields để cập nhật.');
          return;
        }
      }

      console.log('Update category request sent (Frontend logic)');
    } catch (err) {
      console.error('Error updating category (Frontend logic):', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi cập nhật danh mục',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#7A5C3E] mb-1"
        >
          Tên danh mục <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-[#E5E3DF] rounded focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Nhập tên danh mục"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#7A5C3E] mb-1"
        >
          Mô tả (Tùy chọn)
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-[#E5E3DF] rounded focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Nhập mô tả danh mục (nếu có)"
          rows={3}
        />
      </div>

      {category.image_url && (
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-[#7A5C3E]">
            Ảnh hiện tại:
          </label>
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E5E3DF]">
            <Image
              src={category.image_url}
              alt="Category image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-[#7A5C3E] mb-1"
        >
          Thay đổi ảnh (Tùy chọn)
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
          className="w-full text-sm text-[#7A5C3E] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F8F6F3] file:text-[#B86B2B] hover:file:bg-[#E6A15A] hover:file:text-white disabled:file:bg-gray-200 disabled:file:text-gray-500 disabled:cursor-not-allowed"
        />
        {imageFile && (
          <p className="mt-1 text-xs text-[#7A5C3E]">
            Đã chọn: {imageFile.name}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-[#B86B2B] rounded hover:bg-[#A05A1A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6A15A] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  );
}

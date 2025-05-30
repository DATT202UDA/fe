import { useState } from 'react';
import { FormInput } from '@/components/admin/common/FormInput';
import { FormTextarea } from '@/components/admin/common/FormTextarea';
import { FormImageUpload } from '@/components/admin/common/FormImageUpload';
import { Category, CreateCategoryDto } from '@/types/category';
import CategoryService from '@/services/CategoryService';

interface CategoryCreateFormProps {
  onSubmit: (data: CreateCategoryDto) => Promise<void>;
  isSubmitting: boolean;
}

export function CategoryCreateForm({
  onSubmit,
  isSubmitting,
}: CategoryCreateFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      let image_url = '';
      if (image) {
        const result = await CategoryService.uploadImage(image);
        image_url = result.url;
      }

      const createData: CreateCategoryDto = {
        name: name.trim(),
        description: description.trim() || undefined,
        image: image_url || undefined,
      };

      await onSubmit(createData);

      // Reset form
      setName('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error creating category:', err);
      setError(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo danh mục',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
          {error}
        </div>
      )}

      <FormInput
        label="Tên danh mục"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting}
        required
        error={error && !name.trim() ? 'Vui lòng nhập tên danh mục' : undefined}
      />

      <FormTextarea
        label="Mô tả"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
        placeholder="Nhập mô tả danh mục (nếu có)"
      />

      <FormImageUpload
        label="Ảnh danh mục"
        name="image"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
          } else {
            setImage(null);
            setImagePreview(null);
          }
        }}
        disabled={isSubmitting}
        previewUrl={imagePreview}
        onPreviewChange={setImagePreview}
      />

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-[#B86B2B] rounded hover:bg-[#A05A1A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6A15A] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo danh mục'}
        </button>
      </div>
    </form>
  );
}

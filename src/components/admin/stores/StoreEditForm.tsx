'use client';

import { useEffect, useState } from 'react';
import StoreService from '@/services/StoreService';
import { FormInput } from '@/components/admin/common/FormInput';
import { FormTextarea } from '@/components/admin/common/FormTextarea';
import { FormImageUpload } from '@/components/admin/common/FormImageUpload';
import Image from 'next/image';
import { Store, UpdateStoreDto } from '@/types/store';

interface StoreEditFormProps {
  store: Store;
  onSubmit: (data: Partial<UpdateStoreDto>) => Promise<void>;
  isLoading: boolean;
}

export function StoreEditForm({
  store,
  onSubmit,
  isLoading,
}: StoreEditFormProps) {
  const [name, setName] = useState(store.name || '');
  const [description, setDescription] = useState(store.description || '');
  const [phone, setPhone] = useState(store.phone || '');
  const [email, setEmail] = useState(store.email || '');
  const [address, setAddress] = useState(store.address || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect to reset form state when the store prop changes
  useEffect(() => {
    setName(store.name || '');
    setDescription(store.description || '');
    setPhone(store.phone || '');
    setEmail(store.email || '');
    setAddress(store.address || '');
    setImageFile(null); // Reset image file when store changes
    setError(null); // Reset error state
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

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
      let imageUrlToUpdate = store.image_url; // Start with current image URL

      if (imageFile) {
        // Step 1: Upload the new image if a file is selected
        try {
          console.log('StoreEditForm: Bắt đầu upload ảnh:', imageFile.name);
          const result = await StoreService.uploadImage(imageFile); // Use StoreService.uploadImage
          console.log('StoreEditForm: Upload ảnh thành công:', result);
          // Use secure_url from Cloudinary response
          imageUrlToUpdate = result.url;
        } catch (uploadError: any) {
          console.error('StoreEditForm: Lỗi upload ảnh:', uploadError);
          setError(
            uploadError instanceof Error
              ? `Lỗi upload ảnh: ${uploadError.message}`
              : uploadError?.message || 'Có lỗi xảy ra khi upload ảnh',
          );
          // Stop the update process if image upload fails
          return;
        }
      }

      // Step 2: Prepare update data with new image URL (if uploaded) and text fields
      const updateData: Partial<UpdateStoreDto> = {
        name: name.trim(),
        description: description.trim() || undefined,
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        // Include image_url only if it has changed or a new image was uploaded
        image_url:
          imageUrlToUpdate !== store.image_url ? imageUrlToUpdate : undefined,
      };

      // Only include fields that have actually changed (prevent sending unchanged data)
      const changedData: Partial<UpdateStoreDto> = {};
      if (updateData.name !== store.name) changedData.name = updateData.name;
      if (updateData.description !== (store.description || ''))
        changedData.description = updateData.description;
      if (updateData.phone !== store.phone)
        changedData.phone = updateData.phone;
      if (updateData.email !== store.email)
        changedData.email = updateData.email;
      if (updateData.address !== store.address)
        changedData.address = updateData.address;
      // Include image_url if it changed (either a new image was uploaded or it was cleared)
      if (updateData.image_url !== store.image_url)
        changedData.image_url = updateData.image_url;

      if (Object.keys(changedData).length === 0) {
        console.log('StoreEditForm: Không có thay đổi để cập nhật.');
        // Optionally close modal or provide feedback
        // onSubmit({}); // You might still want to call onSubmit with empty data if parent expects a submission signal
        return;
      }

      console.log(
        'StoreEditForm: Gửi request update store với JSON data:',
        changedData,
      );
      // Step 3: Submit the update data (which now includes the new image URL if applicable)
      await onSubmit(changedData);
      console.log('StoreEditForm: Update store request sent (Frontend logic)');
    } catch (err: any) {
      console.error('StoreEditForm: Error updating store:', err);
      setError(
        err instanceof Error
          ? err.message
          : err?.message || 'Có lỗi xảy ra khi cập nhật cửa hàng',
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
        label="Tên cửa hàng"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        required
      />
      <FormInput
        label="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={isLoading}
        required
      />
      <FormTextarea
        label="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <FormInput
        label="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={isLoading}
        required
      />
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />

      {store.image_url &&
        !imageFile && ( // Show existing image if no new file selected
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-[#7A5C3E]">
              Ảnh hiện tại:
            </label>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#E5E3DF] flex-shrink-0">
              <Image
                src={store.image_url}
                alt="Store image"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>
        )}

      <FormImageUpload
        label="Thay đổi ảnh (Tùy chọn)"
        name="image"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
            // No preview needed for edit form, current image is shown
          } else {
            setImageFile(null);
          }
        }}
        disabled={isLoading}
        // No previewUrl prop needed here as we show the existing store.image_url or handle upload internally
        // onPreviewChange is not used as we don't have a preview in this form
      />

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

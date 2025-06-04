'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/common/DataTable';
import { FaSearch } from 'react-icons/fa';

import { Category } from '@/types/category';
import { toast } from 'react-hot-toast';
import { Modal } from '@/components/admin/common/Modal';
import { CategoryEditForm } from '@/components/admin/categories/CategoryEditForm';
import Image from 'next/image';
import { CategoryCreateForm } from '@/components/admin/categories/CategoryCreateForm';
import CategoryService from '@/services/CategoryService';
import { UpdateCategoryDto, CreateCategoryDto } from '@/types/category';

export default function CategoriesView() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await CategoryService.findAll({
        page: currentPage,
        limit: 10,
        search: searchTerm,
      });
      setCategories(response.categories);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi tải danh sách danh mục',
      );
      toast.error('Không thể tải danh sách danh mục');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered, fetching data for page:', currentPage);
    fetchCategories();
  }, [currentPage, searchTerm]);

  const handleEditClick = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (
    data: FormData | Partial<UpdateCategoryDto>,
  ) => {
    if (!categoryToEdit) return;
    try {
      setIsUpdating(true);
      await CategoryService.update(categoryToEdit._id, data);
      toast.success('Cập nhật danh mục thành công!');
      setIsEditModalOpen(false);
      setCategoryToEdit(null);
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi cập nhật danh mục',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      setIsDeleting(true);
      await CategoryService.delete(categoryToDelete._id);
      toast.success('Xóa danh mục thành công!');
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa danh mục',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    fetchCategories();
  };

  const columns = [
    {
      header: 'STT',
      cell: (value: any, row: Category, rowIndex: number) =>
        (currentPage - 1) * 10 + rowIndex + 1,
    },
    {
      header: 'Ảnh',
      cell: (value: any, row: Category) =>
        row.image_url ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={row.image_url}
              alt="Category image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : null,
    },
    {
      header: 'Tên danh mục',
      accessor: 'name' as keyof Category,
    },
    {
      header: 'Mô tả',
      accessor: 'description' as keyof Category,
    },
    {
      header: 'Ngày tạo',
      accessor: 'created_at' as keyof Category,
      cell: (value: string | undefined) =>
        value ? new Date(value).toLocaleString() : '',
    },
    {
      header: 'Ngày cập nhật',
      accessor: 'updated_at' as keyof Category,
      cell: (value: string | undefined) =>
        value ? new Date(value).toLocaleString() : '',
    },
    {
      header: 'Hành động',
      cell: (value: any, row: Category) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#B86B2B]">Quản lý danh mục</h2>
        <p className="text-[#7A5C3E] mt-1">
          Xem và quản lý danh sách các danh mục sản phẩm
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E3DF] focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5C3E]" />
          </div>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
        >
          Thêm danh mục mới
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-[#7A5C3E]">Đang tải...</div>
      ) : error ? null : (
        <DataTable
          columns={columns as any}
          data={categories}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => {
              console.log('Page change requested to page:', page);
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />
      )}

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCategoryToEdit(null);
        }}
        title="Chỉnh sửa danh mục"
      >
        {categoryToEdit && (
          <CategoryEditForm
            category={categoryToEdit}
            onSubmit={handleUpdateSubmit}
            isLoading={isUpdating}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        title="Xác nhận xóa danh mục"
      >
        {categoryToDelete && (
          <div className="space-y-4">
            <p className="text-[#7A5C3E]">
              Bạn có chắc chắn muốn xóa danh mục{' '}
              <strong>{categoryToDelete.name}</strong> không?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCategoryToDelete(null);
                }}
                className="px-4 py-2 text-sm text-[#7A5C3E] border border-[#E5E3DF] rounded hover:bg-[#F8F6F3]"
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeleting}
              >
                {isDeleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Tạo danh mục mới"
      >
        <CategoryCreateForm
          onSubmit={async (data: CreateCategoryDto) => {
            try {
              await CategoryService.create(data);
              handleCreateSuccess();
            } catch (err) {
              console.error('Error creating category:', err);
              toast.error(
                err instanceof Error
                  ? err.message
                  : 'Có lỗi xảy ra khi tạo danh mục',
              );
            }
          }}
          isSubmitting={false}
        />
      </Modal>
    </div>
  );
}

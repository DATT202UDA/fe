'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DataTable } from '@/components/admin/common/DataTable';
import StoreService, { Store, StoreStatus } from '@/services/StoreService';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Modal } from '@/components/admin/common/Modal';
import { StoreEditForm } from '@/components/admin/stores/StoreEditForm';
import { UpdateStoreDto, UpdateStoreStatusDto } from '@/types/store';

interface StoreColumn {
  header: string;
  accessor?: keyof Store | string;
  cell: (value: any, row: Store, rowIndex: number) => React.ReactNode;
}

export default function StoresView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StoreStatus | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [totalStores, setTotalStores] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [storeToEdit, setStoreToEdit] = useState<Store | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await StoreService.getAll({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
      });
      setStores(response.stores);
      setTotalStores(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi tải danh sách cửa hàng',
      );
      toast.error('Không thể tải danh sách cửa hàng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [currentPage, searchTerm, statusFilter]);

  const handleStatusChange = async (store: Store, newStatus: StoreStatus) => {
    setSelectedStore(store);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async (data: UpdateStoreStatusDto) => {
    if (!selectedStore) return;
    try {
      setIsUpdatingStatus(true);
      const updateData: UpdateStoreStatusDto = {
        status: data.status,
        note:
          data.note ||
          `Đã ${
            data.status === StoreStatus.APPROVED ? 'duyệt' : 'từ chối'
          } bởi admin`,
        rejection_reason:
          data.status === StoreStatus.REJECTED
            ? data.rejection_reason
            : undefined,
      };
      await StoreService.updateStatus(selectedStore._id, updateData);
      toast.success('Cập nhật trạng thái cửa hàng thành công!');
      setIsStatusModalOpen(false);
      setSelectedStore(null);
      fetchStores();
    } catch (err) {
      console.error('Error updating store status:', err);
      toast.error(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi cập nhật trạng thái cửa hàng',
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteClick = (store: Store) => {
    setStoreToDelete(store);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!storeToDelete) return;
    try {
      setIsDeleting(true);
      await StoreService.delete(storeToDelete._id);
      toast.success('Xóa cửa hàng thành công!');
      setIsDeleteModalOpen(false);
      setStoreToDelete(null);
      fetchStores();
    } catch (err) {
      console.error('Error deleting store:', err);
      toast.error(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa cửa hàng',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (store: Store) => {
    setStoreToEdit(store);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (data: UpdateStoreDto) => {
    if (!storeToEdit) return;
    try {
      setIsUpdating(true);
      console.log(
        'StoresView: Gửi request update store với data:',
        JSON.stringify(data, null, 2),
      );
      await StoreService.update(storeToEdit._id, data);
      toast.success('Cập nhật cửa hàng thành công!');
      setIsEditModalOpen(false);
      setStoreToEdit(null);
      fetchStores();
    } catch (err) {
      console.error('Error updating store:', err);
      toast.error(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi cập nhật cửa hàng',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadgeClass = (status: StoreStatus) => {
    switch (status) {
      case StoreStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case StoreStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case StoreStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case StoreStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: StoreStatus) => {
    switch (status) {
      case StoreStatus.PENDING:
        return 'Chờ duyệt';
      case StoreStatus.APPROVED:
        return 'Đã duyệt';
      case StoreStatus.REJECTED:
        return 'Đã từ chối';
      case StoreStatus.COMPLETED:
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  const columns: StoreColumn[] = [
    {
      header: 'STT',
      cell: (value: any, row: Store, rowIndex: number) =>
        (currentPage - 1) * 10 + rowIndex + 1,
    },
    {
      header: 'Tên cửa hàng',
      accessor: 'name',
      cell: (value: any, row: Store) => (
        <div className="flex items-center gap-2">
          {row.image_url && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E5E3DF] flex-shrink-0">
              <Image
                src={row.image_url}
                alt={row.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          )}
          <span>{row.name}</span>
        </div>
      ),
    },

    {
      header: 'Số điện thoại',
      accessor: 'phone',
      cell: (value: any, row: Store) => row.phone,
    },
    {
      header: 'Email',
      accessor: 'email',
      cell: (value: any, row: Store) => row.email,
    },
    {
      header: 'Địa chỉ',
      accessor: 'address',
      cell: (value: any, row: Store) => row.address,
    },
    {
      header: 'Đánh giá',
      accessor: 'rate_avg',
      cell: (value: any, row: Store) =>
        typeof row.rate_avg === 'number' ? row.rate_avg.toFixed(1) : 'N/A',
    },
    {
      header: 'Trạng thái',
      accessor: 'status',
      cell: (value: any, row: Store) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
            row.status,
          )}`}
        >
          {getStatusText(row.status)}
        </span>
      ),
    },
    {
      header: 'Ngày tạo',
      accessor: 'created_at',
      cell: (value: any, row: Store) =>
        row.created_at
          ? new Date(row.created_at).toLocaleDateString('vi-VN')
          : '',
    },

    {
      header: 'Hành động',
      cell: (value: any, row: Store) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Chỉnh sửa
          </button>
          {row.status === StoreStatus.PENDING && (
            <>
              <button
                onClick={() => handleStatusChange(row, StoreStatus.APPROVED)}
                className="px-2 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50"
              >
                Duyệt
              </button>
              <button
                onClick={() => handleStatusChange(row, StoreStatus.REJECTED)}
                className="px-2 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Từ chối
              </button>
            </>
          )}
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
        <h2 className="text-2xl font-bold text-[#B86B2B]">Quản lý cửa hàng</h2>
        <p className="text-[#7A5C3E] mt-1">
          Xem và quản lý danh sách các cửa hàng
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên cửa hàng, địa chỉ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E3DF] focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5C3E]" />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as StoreStatus | 'ALL')
            }
            className="px-4 py-2 rounded-lg border border-[#E5E3DF] focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value={StoreStatus.PENDING}>Chờ duyệt</option>
            <option value={StoreStatus.APPROVED}>Đã duyệt</option>
            <option value={StoreStatus.REJECTED}>Đã từ chối</option>
            <option value={StoreStatus.COMPLETED}>Hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="text-center text-[#7A5C3E]">Đang tải...</div>
      ) : error ? null : (
        <div className="w-full overflow-x-auto min-w-[1200px]">
          <DataTable
            columns={columns as any}
            data={stores}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: (page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
            }}
          />
        </div>
      )}

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedStore(null);
        }}
        title="Cập nhật trạng thái cửa hàng"
      >
        {selectedStore && (
          <div className="space-y-4">
            <p className="text-[#7A5C3E]">
              Bạn có chắc chắn muốn cập nhật trạng thái cửa hàng{' '}
              <strong>{selectedStore.name}</strong> không?
            </p>
            <div className="flex flex-col gap-4">
              {selectedStore.status === StoreStatus.PENDING && (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleConfirmStatusChange({
                          status: StoreStatus.APPROVED,
                          note: 'Đã duyệt bởi admin',
                        })
                      }
                      className="flex-1 px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isUpdatingStatus}
                    >
                      Duyệt
                    </button>
                    <button
                      onClick={() =>
                        handleConfirmStatusChange({
                          status: StoreStatus.REJECTED,
                          note: 'Đã từ chối bởi admin',
                          rejection_reason: 'Không đáp ứng yêu cầu',
                        })
                      }
                      className="flex-1 px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isUpdatingStatus}
                    >
                      Từ chối
                    </button>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsStatusModalOpen(false);
                    setSelectedStore(null);
                  }}
                  className="px-4 py-2 text-sm text-[#7A5C3E] border border-[#E5E3DF] rounded hover:bg-[#F8F6F3]"
                  disabled={isUpdatingStatus}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setStoreToDelete(null);
        }}
        title="Xác nhận xóa cửa hàng"
      >
        {storeToDelete && (
          <div className="space-y-4">
            <p className="text-[#7A5C3E]">
              Bạn có chắc chắn muốn xóa cửa hàng{' '}
              <strong>{storeToDelete.name}</strong> không?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setStoreToDelete(null);
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

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setStoreToEdit(null);
        }}
        title="Chỉnh sửa cửa hàng"
      >
        {storeToEdit && (
          <StoreEditForm
            store={storeToEdit}
            onSubmit={handleUpdateSubmit}
            isLoading={isUpdating}
          />
        )}
      </Modal>
    </div>
  );
}

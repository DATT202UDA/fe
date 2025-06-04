'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DataTable } from '@/components/admin/common/DataTable';
import { Modal } from '@/components/admin/common/Modal';
import { FormInput } from '@/components/admin/common/FormInput';
import StoreService, { StoreRequest } from '@/services/StoreService';
import { toast } from 'react-hot-toast';

export default function StoreRequestsView() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<StoreRequest | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'pending' | 'approved' | 'rejected'
  >('ALL');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storeRequests, setStoreRequests] = useState<StoreRequest[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchStoreRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const {
        requests: fetchedRequests,
        total,
        totalPages: fetchedTotalPages,
      } = await StoreService.getStoreRequests({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
      });
      console.log('StoreRequestsView: Fetched requests:', fetchedRequests);
      setStoreRequests(fetchedRequests);
      setTotalRequests(total);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      console.error('Error fetching store requests:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi tải danh sách yêu cầu',
      );
      toast.error('Không thể tải danh sách yêu cầu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreRequests();
  }, [currentPage, searchTerm, statusFilter]);

  const handleViewClick = (request: StoreRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleProcessClick = (request: StoreRequest) => {
    setSelectedRequest(request);
    setIsProcessModalOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    try {
      setIsProcessing(true);
      await StoreService.processStoreRequest(selectedRequest._id, {
        status: 'approved',
      });
      toast.success('Duyệt yêu cầu thành công!');
      setIsProcessModalOpen(false);
      setSelectedRequest(null);
      fetchStoreRequests();
    } catch (err) {
      console.error('Error approving store request:', err);
      toast.error(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi duyệt yêu cầu',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) return;
    try {
      setIsProcessing(true);
      await StoreService.processStoreRequest(selectedRequest._id, {
        status: 'rejected',
        rejection_reason: rejectionReason.trim(),
      });
      toast.success('Từ chối yêu cầu thành công!');
      setIsProcessModalOpen(false);
      setSelectedRequest(null);
      setRejectionReason('');
      fetchStoreRequests();
    } catch (err) {
      console.error('Error rejecting store request:', err);
      toast.error(
        err instanceof Error
          ? err.message
          : 'Có lỗi xảy ra khi từ chối yêu cầu',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const columns = [
    {
      header: 'STT',
      cell: (value: any, row: StoreRequest, rowIndex: number) =>
        (currentPage - 1) * 10 + rowIndex + 1,
    },
    {
      header: 'Tên cửa hàng',
      cell: (value: any, row: StoreRequest) => {
        console.log('StoreRequestsView: Rendering store name for row:', {
          name: (row as any).name,
          row: row,
        });
        return (
          <div className="font-medium">
            {(row as any).name || 'Chưa có tên cửa hàng'}
          </div>
        );
      },
    },
    {
      header: 'Chủ cửa hàng',
      cell: (value: any, row: StoreRequest) => row.owner?.full_name || 'N/A',
    },
    {
      header: 'Email',
      cell: (value: any, row: StoreRequest) => row.owner?.email || 'N/A',
    },
    {
      header: 'Số điện thoại',
      cell: (value: any, row: StoreRequest) => row.phone || 'N/A',
    },
    {
      header: 'Trạng thái',
      cell: (value: any, row: StoreRequest) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.status === 'approved'
              ? 'bg-green-100 text-green-800'
              : row.status === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.status === 'approved'
            ? 'Đã duyệt'
            : row.status === 'rejected'
            ? 'Đã từ chối'
            : 'Đang chờ duyệt'}
        </span>
      ),
    },
    {
      header: 'Ngày tạo',
      accessor: 'createdAt' as keyof StoreRequest,
      cell: (value: string | undefined) =>
        value ? new Date(value).toLocaleString() : '',
    },
    {
      header: 'Hành động',
      cell: (value: any, row: StoreRequest) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewClick(row)}
            className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Xem chi tiết
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => handleProcessClick(row)}
              className="px-2 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50"
            >
              Xử lý
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#B86B2B]">Yêu cầu cửa hàng</h2>
        <p className="text-[#7A5C3E] mt-1">
          Xem và xử lý các yêu cầu đăng ký cửa hàng
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên cửa hàng, chủ cửa hàng..."
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
              setStatusFilter(
                e.target.value as 'ALL' | 'pending' | 'approved' | 'rejected',
              )
            }
            className="px-4 py-2 rounded-lg border border-[#E5E3DF] focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="pending">Đang chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Đã từ chối</option>
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
        <DataTable
          columns={columns as any}
          data={storeRequests}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
          }}
        />
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRequest(null);
        }}
        title="Chi tiết yêu cầu"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-[#7A5C3E]">Thông tin cửa hàng</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Tên cửa hàng:</span>{' '}
                  {(selectedRequest as any).name}
                </p>
                <p>
                  <span className="font-medium">Mô tả:</span>{' '}
                  {selectedRequest.description || 'Không có'}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{' '}
                  {selectedRequest.address || 'Không có'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#7A5C3E]">
                Thông tin chủ cửa hàng
              </h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Họ tên:</span>{' '}
                  {selectedRequest.owner?.full_name || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  {selectedRequest.owner?.email || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{' '}
                  {selectedRequest.phone || 'N/A'}
                </p>
              </div>
            </div>

            {selectedRequest.status === 'rejected' && (
              <div>
                <h3 className="font-medium text-[#7A5C3E]">Lý do từ chối</h3>
                <p className="mt-2 text-red-600">
                  {selectedRequest.rejection_reason}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Process Modal */}
      <Modal
        isOpen={isProcessModalOpen}
        onClose={() => {
          setIsProcessModalOpen(false);
          setSelectedRequest(null);
          setRejectionReason('');
        }}
        title="Xử lý yêu cầu"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <p className="text-[#7A5C3E]">
              Bạn muốn xử lý yêu cầu của cửa hàng{' '}
              <strong>{(selectedRequest as any).name}</strong> như thế nào?
            </p>

            <div className="space-y-4">
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Đang xử lý...' : 'Duyệt yêu cầu'}
              </button>

              <div className="space-y-2">
                <FormInput
                  label="Lý do từ chối"
                  type="textarea"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối yêu cầu"
                  disabled={isProcessing}
                />
                <button
                  onClick={handleReject}
                  disabled={isProcessing || !rejectionReason.trim()}
                  className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Đang xử lý...' : 'Từ chối yêu cầu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import TransactionService, {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/services/TransactionService';
import axiosInstance from '@/lib/axios';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import useDebounce from '@/hooks/useDebounce';

dayjs.locale('vi');

const DepositsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'ALL'>(
    'ALL',
  );
  const debouncedSearchCode = useDebounce(searchCode, 500);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    try {
      const response = await TransactionService.getTransactions({
        page: currentPage,
        limit: itemsPerPage,
        type: TransactionType.DEPOSIT,
        searchCode: debouncedSearchCode || undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
      });
      setTransactions(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTotalPages(1);
      setTotalItems(0);
      toast.error('Có lỗi xảy ra khi tải danh sách giao dịch');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (transactionId: string) => {
    try {
      setActionLoading(true);
      await TransactionService.confirmTransaction(transactionId);
      setShowConfirmModal(false);
      setSelectedTransaction(null);
      toast.success('Xác nhận giao dịch thành công');
      fetchTransactions();
    } catch (error) {
      console.error('Error confirming transaction:', error);
      toast.error('Có lỗi xảy ra khi xác nhận giao dịch');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (transactionId: string) => {
    try {
      setActionLoading(true);
      await TransactionService.rejectTransaction(transactionId);
      setShowRejectModal(false);
      setSelectedTransaction(null);
      toast.success('Từ chối giao dịch thành công');
      fetchTransactions();
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      toast.error('Có lỗi xảy ra khi từ chối giao dịch');
    } finally {
      setActionLoading(false);
    }
  };

  const openConfirmModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowConfirmModal(true);
  };

  const openRejectModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowRejectModal(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, debouncedSearchCode, statusFilter]);

  console.log(selectedTransaction, 'selectedTransaction');

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case TransactionStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TransactionStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7A5C3E]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#7A5C3E] mb-6">
        Quản lý giao dịch nạp tiền
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-gray-600">
              Tổng số giao dịch: {totalItems}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm mã giao dịch..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A5C3E] focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TransactionStatus | 'ALL')
                }
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A5C3E] focus:border-transparent"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value={TransactionStatus.PENDING}>Đang chờ</option>
                <option value={TransactionStatus.COMPLETED}>
                  Đã hoàn thành
                </option>
                <option value={TransactionStatus.REJECTED}>Đã từ chối</option>
              </select>
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã giao dịch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian xác nhận
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_code}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.transaction_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.amount.toLocaleString('vi-VN')} đ
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      transaction.status,
                    )}`}
                  >
                    {transaction.status === TransactionStatus.PENDING &&
                      'Đang chờ'}
                    {transaction.status === TransactionStatus.COMPLETED &&
                      'Đã hoàn thành'}
                    {transaction.status === TransactionStatus.REJECTED &&
                      'Đã từ chối'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dayjs(transaction.created_at).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.confirmed_at
                    ? dayjs(transaction.confirmed_at).format('DD/MM/YYYY HH:mm')
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {transaction.status === TransactionStatus.PENDING && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openConfirmModal(transaction)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => openRejectModal(transaction)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang trước
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang sau
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {totalItems > 0 ? (
                    <>
                      Hiển thị{' '}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{' '}
                      đến{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, totalItems)}
                      </span>{' '}
                      của <span className="font-medium">{totalItems}</span> kết
                      quả
                    </>
                  ) : (
                    'Không có kết quả nào'
                  )}
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Trang trước</span>
                    &laquo;
                  </button>
                  {totalPages > 0 &&
                    [...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? 'z-10 bg-[#7A5C3E] border-[#7A5C3E] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Trang sau</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Xác nhận giao dịch
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Bạn có chắc chắn muốn xác nhận giao dịch này?
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  Mã giao dịch: {selectedTransaction.transaction_code}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Số tiền: {selectedTransaction.amount.toLocaleString('vi-VN')}{' '}
                  đ
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedTransaction(null);
                  }}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleConfirm(selectedTransaction._id)}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Xác nhận'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Từ chối giao dịch
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Bạn có chắc chắn muốn từ chối giao dịch này?
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  Mã giao dịch: {selectedTransaction.transaction_code}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Số tiền: {selectedTransaction.amount.toLocaleString('vi-VN')}{' '}
                  đ
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setSelectedTransaction(null);
                  }}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleReject(selectedTransaction._id)}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Từ chối'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositsView;

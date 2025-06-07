import axiosInstance from '@/lib/axios';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export interface Transaction {
  user_id: string;
  type: TransactionType;
  transaction_code: string;
  amount: number;
  status: TransactionStatus;
  created_at: Date;
  confirmed_at: Date | null;
  _id: string;
}

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  searchCode?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface GetTransactionsResponse {
  data: Transaction[];
  pagination: PaginationInfo;
}

class TransactionService {
  static async deposit(
    amount: number,
    transactionCode: string,
  ): Promise<{ message: string; data: Transaction }> {
    const response = await axiosInstance.post<{
      message: string;
      data: Transaction;
    }>('/transactions', {
      amount,
      transactionCode,
      type: TransactionType.DEPOSIT,
    });
    return response.data;
  }

  static async withdraw(
    amount: number,
    transactionCode: string,
  ): Promise<Transaction> {
    const response = await axiosInstance.post<Transaction>('/transactions', {
      amount,
      transaction_code: transactionCode,
      type: TransactionType.WITHDRAW,
    });
    return response.data;
  }

  static async getTransactions(
    params?: GetTransactionsParams,
  ): Promise<GetTransactionsResponse> {
    const response = await axiosInstance.get<GetTransactionsResponse>(
      '/transactions',
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          type: params?.type,
          status: params?.status,
          searchCode: params?.searchCode,
        },
      },
    );
    return response.data;
  }

  static async confirmTransaction(
    transactionId: string,
  ): Promise<{ message: string; data: Transaction }> {
    const response = await axiosInstance.put<{
      message: string;
      data: Transaction;
    }>(`/transactions/${transactionId}/status`);
    return response.data;
  }

  static async rejectTransaction(
    transactionId: string,
  ): Promise<{ message: string; data: Transaction }> {
    const response = await axiosInstance.put<{
      message: string;
      data: Transaction;
    }>(`/transactions/${transactionId}/reject`);
    return response.data;
  }
}

export default TransactionService;

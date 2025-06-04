import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T, rowIndex: number) => ReactNode;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  pagination?: PaginationProps;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;

  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1,
      ),
      1,
    );
    visiblePages = pages.slice(start - 1, start - 1 + maxVisiblePages);
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E3DF]">
      <div className="flex items-center gap-2 text-sm text-[#7A5C3E]">
        <span>Trang</span>
        <span className="font-medium">{currentPage}</span>
        <span>trên</span>
        <span className="font-medium">{totalPages}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-[#E5E3DF] rounded hover:bg-[#F8F6F3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 text-sm border border-[#E5E3DF] rounded hover:bg-[#F8F6F3]"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-[#7A5C3E]">...</span>
            )}
          </>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm border rounded ${
              currentPage === page
                ? 'bg-[#E6A15A] text-white border-[#E6A15A]'
                : 'border-[#E5E3DF] hover:bg-[#F8F6F3] text-[#7A5C3E]'
            }`}
          >
            {page}
          </button>
        ))}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-[#7A5C3E]">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 text-sm border border-[#E5E3DF] rounded hover:bg-[#F8F6F3]"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-[#E5E3DF] rounded hover:bg-[#F8F6F3] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E5E3DF]">
          <thead className="bg-[#F8F6F3]">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-[#7A5C3E] uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-[#E5E3DF]">
            {/* Check if data is an array and map over it if not empty */}
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`${
                    onRowClick ? 'cursor-pointer hover:bg-[#F8F6F3]' : ''
                  } transition-colors`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[#7A5C3E]"
                    >
                      {column.cell
                        ? column.cell(
                            row[column.accessor] as any,
                            row,
                            rowIndex,
                          )
                        : String(row[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // Display 'No data' message if data is an empty array or not a valid array
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-[#7A5C3E]"
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}

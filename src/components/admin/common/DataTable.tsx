import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T, rowIndex: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
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
    </div>
  );
}

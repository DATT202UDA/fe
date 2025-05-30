import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E5E3DF] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#7A5C3E] text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-[#B86B2B] mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-[#7A5C3E] text-sm ml-2">
                so với tháng trước
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#F8F6F3] flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#E6A15A]" />
        </div>
      </div>
    </div>
  );
};

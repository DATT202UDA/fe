const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-48 md:h-64">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-4 md:p-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

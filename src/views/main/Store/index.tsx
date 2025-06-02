'use client';

import ShopService, { Category, StoreData } from '@/services/ShopService';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaStore,
  FaBox,
  FaChartLine,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaCog,
} from 'react-icons/fa';
import NotExistStore from './NotExistStore';
import { toast } from 'react-hot-toast';
import AddProductModal from './AddProductModal';
import CategoryService from '@/services/CategoryService';
import ProductService, {
  Product as ProductType,
  UpdateProductDto,
} from '@/services/ProductService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
  categoryId: string;
  description?: string;
}

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  price: z
    .string()
    .min(1, 'Giá sản phẩm là bắt buộc')
    .refine((val) => !isNaN(Number(val)), 'Giá phải là số')
    .refine((val) => Number(val) > 0, 'Giá phải lớn hơn 0'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
  image: z.any().optional(),
  categoryId: z.string().min(1, 'Danh mục sản phẩm là bắt buộc'),
});

type ProductFormData = z.infer<typeof productSchema>;

const StoreView = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [shopInfo, setShopInfo] = useState<StoreData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const shopData = await ShopService.getShopInfo();
        setShopInfo(shopData);

        // Fetch products after getting shop info
        if (shopData) {
          const { data: productsData } = await ProductService.findByStore(
            shopData._id,
          );
          setProducts(productsData);
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        toast.error('Không thể lấy thông tin cửa hàng');
      } finally {
        setIsLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.findAll();
        setCategories(data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        name: selectedProduct.name,
        price: selectedProduct.price.replace(/\./g, ''),
        description: selectedProduct.description,
      });
    }
  }, [selectedProduct, reset]);

  console.log(categories);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FDFBF8] to-white">
        <div className="relative flex items-center justify-center">
          <div className="animate-pulse w-20 h-20 rounded-full bg-[#E6A15A]/20 flex items-center justify-center shadow-lg">
            <FaStore className="text-5xl text-[#E6A15A] drop-shadow-lg animate-bounce" />
          </div>
          <div className="absolute w-28 h-28 rounded-full border-4 border-[#E6A15A]/30 animate-ping" />
        </div>
        <div className="mt-8 text-[#B86B2B] text-lg font-semibold tracking-wide animate-pulse">
          Đang tải cửa hàng...
        </div>
      </div>
    );
  }

  if (!shopInfo) {
    return <NotExistStore />;
  }

  const handleEdit = (product: ProductType) => {
    setSelectedProduct({
      _id: product._id,
      name: product.name,
      price: product.price.toLocaleString('vi-VN'),
      image: product.image_url,
      categoryId: product.category_id || '',
      description: product.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: ProductType) => {
    setSelectedProduct({
      _id: product._id,
      name: product.name,
      price: product.price.toLocaleString('vi-VN'),
      image: product.image_url,
      categoryId: product.category_id || '',
      description: product.description,
    });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await ProductService.remove(selectedProduct._id);
      setProducts(products.filter((p) => p._id !== selectedProduct._id));
      toast.success('Xóa sản phẩm thành công');
      handleCloseModals();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Không thể xóa sản phẩm');
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!selectedProduct) return;

    try {
      const updateData: UpdateProductDto = {
        name: data.name,
        price: Number(data.price),
        description: data.description || '',
      };

      // Upload new image if changed
      if (data.image?.[0]) {
        await ShopService.uploadImage(data.image[0]);
      }

      const updatedProduct = await ProductService.update(
        selectedProduct._id,
        updateData,
      );

      // Update products list
      setProducts(
        products.map((p) =>
          p._id === selectedProduct._id ? updatedProduct : p,
        ),
      );

      toast.success('Cập nhật sản phẩm thành công');
      handleCloseModals();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Không thể cập nhật sản phẩm',
      );
    }
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedProduct(null);
  };

  console.log(products, 'products');

  const handleAddProductSubmit = async (data: ProductFormData) => {
    try {
      setIsAddingProduct(true);
      if (!shopInfo) {
        toast.error('Không tìm thấy thông tin cửa hàng');
        return;
      }

      // First upload the image
      const uploadResult = await ShopService.uploadImage(data.image as File);
      const imageUrl = uploadResult.url;

      // Then create the product with the image URL
      const productData = {
        name: data.name,
        price: Number(data.price.replace(/\./g, '')),
        description: data.description || '',
        store_id: shopInfo._id,
        category_id: data.categoryId,
        status: 'active',
        image_url: imageUrl,
        user_id: shopInfo.user_id,
      };

      const newProduct = await ProductService.create(productData);

      // Add the new product to the products state
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      toast.success('Thêm sản phẩm thành công');
      handleCloseModals();
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error(error?.response?.data?.message || 'Không thể thêm sản phẩm');
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleStoreEdit = () => {
    // TODO: Implement store edit functionality
    toast('Chức năng đang được phát triển', {
      icon: 'ℹ️',
    });
  };

  const handleStoreDelete = () => {
    // TODO: Implement store delete functionality
    toast('Chức năng đang được phát triển', {
      icon: 'ℹ️',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white">
      {/* Shop Header */}
      <div className="relative h-[44vh] md:h-[38vh] bg-[#F8F6F3] flex items-center border-b border-[#E6A15A]/20">
        <Image
          src={shopInfo.image_url}
          alt="Shop Cover"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3]/80 via-white/60 to-[#F8F6F3]/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-32 h-32 md:w-36 md:h-36 z-10"
              >
                <Image
                  src={shopInfo.image_url}
                  alt={shopInfo.name}
                  fill
                  className="object-cover rounded-2xl border-4 border-white shadow-xl bg-white"
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold text-[#B86B2B] drop-shadow mb-2"
                  >
                    {shopInfo.name}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setIsStoreSettingsOpen(!isStoreSettingsOpen)
                      }
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#E6A15A] hover:text-white transition-colors shadow-lg"
                    >
                      <FaCog className="text-lg" />
                    </motion.button>
                    <AnimatePresence>
                      {isStoreSettingsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl overflow-hidden z-20 border border-gray-100"
                        >
                          <div className="p-3">
                            <button
                              onClick={handleStoreEdit}
                              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-50 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-[#E6A15A]/10 flex items-center justify-center group-hover:bg-[#E6A15A] transition-colors">
                                <FaEdit className="text-[#E6A15A] text-lg group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <span className="text-gray-700 font-medium block text-base">
                                  Chỉnh sửa cửa hàng
                                </span>
                                <span className="text-gray-400 text-sm mt-0.5">
                                  Cập nhật thông tin cửa hàng
                                </span>
                              </div>
                            </button>
                            <button
                              onClick={handleStoreDelete}
                              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-red-50 rounded-xl transition-colors group mt-2"
                            >
                              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                <FaTrash className="text-red-500 text-lg group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <span className="text-red-500 font-medium block text-base">
                                  Xóa cửa hàng
                                </span>
                                <span className="text-gray-400 text-sm mt-0.5">
                                  Xóa vĩnh viễn cửa hàng
                                </span>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center gap-8 mt-2"
                >
                  <div className="flex items-center gap-2 text-[#E6A15A] font-semibold text-lg">
                    <FaStar className="text-[#FFE5A3]" />
                    <span>{(shopInfo.rate_avg || 0).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B86B2B] font-medium">
                    <FaBox />
                    <span>0 sản phẩm</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B86B2B] font-medium">
                    <FaChartLine />
                    <span>0 đơn hàng</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#E6A15A]/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E6A15A]/10 flex items-center justify-center">
                    <FaStore className="text-[#E6A15A]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#B86B2B]">
                    Thông tin cửa hàng
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaMapMarkerAlt className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">
                        Địa chỉ
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {shopInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaPhone className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">
                        Điện thoại
                      </h3>
                      <p className="text-gray-700 text-sm">{shopInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaEnvelope className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">Email</h3>
                      <p className="text-gray-700 text-sm">{shopInfo.email}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <h3 className="font-medium text-[#B86B2B] mb-1">Mô tả</h3>
                    <p className="text-gray-700 text-sm">
                      {shopInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="lg:col-span-9">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#9B7B5C]">
                Sản phẩm của cửa hàng
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddProduct}
                className="bg-[#E6A15A] hover:bg-[#F0B97A] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
              >
                <FaPlus />
                Thêm sản phẩm
              </motion.button>
            </div>

            {productsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-[#E6A15A] border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-[#9B7B5C]">Đang tải sản phẩm...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#E6A15A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBox className="text-3xl text-[#E6A15A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#9B7B5C] mb-2">
                  Chưa có sản phẩm nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Hãy thêm sản phẩm đầu tiên của bạn
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddProduct}
                  className="bg-[#E6A15A] hover:bg-[#F0B97A] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 mx-auto"
                >
                  <FaPlus />
                  Thêm sản phẩm đầu tiên
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative pt-[100%]">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(product)}
                          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#E6A15A] hover:text-white transition-colors shadow-lg"
                        >
                          <FaEdit className="text-lg" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(product)}
                          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                        >
                          <FaTrash className="text-lg" />
                        </motion.button>
                      </div>
                      {product.status === 'active' && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                            Đang bán
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[#9B7B5C] text-lg mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-[#E6A15A]">
                            {product.price.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-xs text-gray-400">
                            Đã bán: 0
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FaStar />
                          <span className="text-sm text-gray-600">5.0</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#9B7B5C]">
                  Xác nhận xóa
                </h3>
                <button
                  onClick={handleCloseModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa sản phẩm &quot;{selectedProduct?.name}
                &quot;? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#9B7B5C]">
                  Chỉnh sửa sản phẩm
                </h3>
                <button
                  onClick={handleCloseModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleUpdateProduct)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={selectedProduct.name}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá
                    </label>
                    <Controller
                      name="price"
                      control={control}
                      defaultValue={selectedProduct.price}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                        />
                      )}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={selectedProduct.description}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình ảnh
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <input
                          {...field}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            onChange(e.target.files);
                            if (e.target.files?.[0]) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById('image-upload')?.click()
                      }
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors"
                    >
                      Thay đổi ảnh
                    </button>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModals}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E6A15A] text-white rounded-lg hover:bg-[#F0B97A] transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        categories={categories.map((cat) => ({ id: cat._id, name: cat.name }))}
        onSubmit={handleAddProductSubmit}
        isLoading={isAddingProduct}
      />
    </div>
  );
};

export default StoreView;

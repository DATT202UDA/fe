'use client';

import ShopService, { StoreData, ShopInfo } from '@/services/ShopService';
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
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import NotExistStore from './NotExistStore';
import { toast } from 'react-hot-toast';
import CategoryService from '@/services/CategoryService';
import ProductService, {
  Product as ProductType,
  UpdateProductDto,
  CreateProductDto,
} from '@/services/ProductService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import StoreService, { StoreRequest, Store } from '@/services/StoreService';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/category';
import EditStoreModal from './EditStoreModal';
import DeleteStoreModal from './DeleteStoreModal';

// Import the new components
import StoreLoadingState from './components/StoreLoadingState';
import StoreRequestStatusState from './components/StoreRequestStatusState';
import ApprovedStoreView from './components/ApprovedStoreView';
import AddProductModal from './components/AddProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import EditProductModal from './components/EditProductModal';

const StoreView = () => {
  // States, hooks, schemas, and handlers should be defined inside the component body

  const [isLoading, setIsLoading] = useState(true); // Define isLoading state
  const [shopInfo, setShopInfo] = useState<Store | null>(null);
  const [pendingRequest, setPendingRequest] = useState<StoreRequest | null>(
    null,
  );
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  ); // Use simple type for categories passed to components
  const [loading, setLoading] = useState(true); // Keep this state if used elsewhere for category loading
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false); // Keep this state

  // Product related state and hooks
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLoading, setProductsLoading] = useState(true); // Define productsLoading
  const [isEditStoreModalOpen, setIsEditStoreModalOpen] = useState(false);
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);
  const [isDeleteStoreModalOpen, setIsDeleteStoreModalOpen] = useState(false);
  const [isDeletingStore, setIsDeletingStore] = useState(false);

  const router = useRouter();

  // Product Schema (Defined inside component)
  const productSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
    price: z
      .string()
      .min(1, 'Giá sản phẩm là bắt buộc')
      .refine((val) => !isNaN(Number(val.replace(/\./g, ''))), 'Giá phải là số')
      .refine(
        (val) => Number(val.replace(/\./g, '')) > 0,
        'Giá phải lớn hơn 0',
      ),
    description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
    image: z.any().optional(),
    categoryId: z.string().min(1, 'Danh mục sản phẩm là bắt buộc'),
    quantity: z.coerce.number().min(1, 'Số lượng sản phẩm là bắt buộc'),
  });

  type ProductFormData = z.infer<typeof productSchema>;

  // React Hook Form (Defined inside component)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Product related handlers
  const handleEdit = (product: ProductType) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
    // Form reset handled in EditProductModal's useEffect
  };

  const handleDelete = (product: ProductType) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedProduct(null);
    setImagePreview(null);
    reset();
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await ProductService.remove(selectedProduct._id);
      setProducts(products.filter((p) => p._id !== selectedProduct._id));
      toast.success('Xóa sản phẩm thành công');
      handleCloseModals();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error?.response?.data?.message || 'Không thể xóa sản phẩm');
    }
  };

  const handleUpdateProduct = async (data: UpdateProductDto, file?: File) => {
    if (!selectedProduct) return;

    try {
      let imageUrl = selectedProduct.image_url; // Use existing image by default

      // Upload new image if a file is provided
      if (file) {
        const uploadResult = await ShopService.uploadImage(file);
        imageUrl = uploadResult.url;
      }

      const updatedProduct = await ProductService.update(
        selectedProduct._id,
        data,
      );

      setProducts(
        products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p,
        ),
      );

      toast.success('Cập nhật sản phẩm thành công');
      handleCloseModals();
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error(
        error?.response?.data?.message || 'Không thể cập nhật sản phẩm',
      );
    }
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
    reset();
  };

  const handleAddProductSubmit = async (data: ProductFormData) => {
    try {
      setIsAddingProduct(true);
      if (!shopInfo || !shopInfo._id) {
        toast.error('Thông tin cửa hàng không khả dụng để thêm sản phẩm.');
        setIsAddingProduct(false);
        return;
      }

      let imageUrl;

      console.log('data:', data.image?.[0]);

      if (data.image) {
        const uploadResult = await ShopService.uploadImage(data.image as File);
        imageUrl = uploadResult.url;
      }

      const productData: CreateProductDto = {
        name: data.name,
        price: Number(data.price.replace(/\./g, '')),
        description: data.description || '',
        store_id: shopInfo._id,
        category_id: data.categoryId,
        status: 'active',
        image_url: imageUrl,
        quantity: data.quantity,
      };

      console.log('productData:', productData);

      const newProduct = await ProductService.create(productData);
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
    setIsEditStoreModalOpen(true);
    setIsStoreSettingsOpen(false);
  };

  const handleStoreDelete = () => {
    setIsDeleteStoreModalOpen(true);
    setIsStoreSettingsOpen(false);
  };

  const handleConfirmDeleteStore = async () => {
    if (!shopInfo) return;

    try {
      setIsDeletingStore(true);
      await ShopService.deleteStore(shopInfo._id);
      toast.success('Xóa cửa hàng thành công');
      // Redirect to home page after successful deletion
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error deleting store:', error);
      toast.error(error?.response?.data?.message || 'Không thể xóa cửa hàng');
    } finally {
      setIsDeletingStore(false);
      setIsDeleteStoreModalOpen(false);
    }
  };

  const handleUpdateStore = async (data: any) => {
    if (!shopInfo) return;

    try {
      setIsUpdatingStore(true);

      // Upload new image if changed
      let imageUrl = shopInfo.image_url;
      if (data.image?.[0]) {
        const uploadResult = await ShopService.uploadImage(data.image[0]);
        imageUrl = uploadResult.url;
      }

      // Update store data
      const updateData = {
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        image_url: imageUrl,
      };

      const updatedStore = await ShopService.update(shopInfo._id, updateData);
      setShopInfo(updatedStore as any);

      toast.success('Cập nhật thông tin cửa hàng thành công');
      setIsEditStoreModalOpen(false);
    } catch (error: any) {
      console.error('Error updating store:', error);
      toast.error(
        error?.response?.data?.message ||
          'Không thể cập nhật thông tin cửa hàng',
      );
    } finally {
      setIsUpdatingStore(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setPendingRequest(null);
        setShopInfo(null);
        setProducts([]);
        setProductsLoading(true);

        const request = await StoreService.getUserStoreRequest();
        console.log('Store request:', request);

        if (request) {
          if (request.status === 'pending' || request.status === 'rejected') {
            setPendingRequest(request);
            setIsLoading(false);
            setProductsLoading(false);
          } else if (request.status === 'approved') {
            console.log('Request approved, fetching store info...');
            try {
              const shopData = await StoreService.getMyStore();
              console.log('Shop data from getMyStore:', shopData);

              if (shopData && shopData._id) {
                console.log('Setting shop info:', shopData);
                setShopInfo(shopData);

                setProductsLoading(true);
                const { data: productsData } = await ProductService.findByStore(
                  shopData._id,
                );
                console.log('Products data:', productsData);
                setProducts(productsData);
              } else {
                console.log(
                  'getMyStore returned no valid data or 404 after approved request',
                );
                toast.error(
                  'Có lỗi xảy ra khi lấy thông tin cửa hàng đã duyệt. Vui lòng liên hệ hỗ trợ.',
                );
                setShopInfo(null);
              }
            } catch (err: any) {
              console.error(
                'Error fetching my store after approved request:',
                err,
              );
              toast.error(
                'Có lỗi xảy ra khi lấy thông tin cửa hàng đã duyệt. Vui lòng liên hệ hỗ trợ.',
              );
              setShopInfo(null);
            } finally {
              setProductsLoading(false);
              setIsLoading(false);
            }
          }
        } else {
          try {
            const shopData = await StoreService.getMyStore();
            console.log('Shop data from getMyStore (no request):', shopData);

            if (shopData && shopData._id) {
              console.log('Setting shop info (no request):', shopData);
              setShopInfo(shopData);

              setProductsLoading(true);
              const { data: productsData } = await ProductService.findByStore(
                shopData._id,
              );
              console.log('Products data (no request):', productsData);
              setProducts(productsData);
            } else {
              console.log(
                'getMyStore returned no valid data or 404 (no request)',
              );
              setShopInfo(null);
            }
          } catch (err: any) {
            console.error('Error fetching my store (no request):', err);
            if (err?.response?.status === 404) {
              console.log('getMyStore returned 404 (no request)');
              setShopInfo(null);
            } else {
              toast.error('Không thể lấy thông tin cửa hàng');
              setShopInfo(null);
            }
          } finally {
            setProductsLoading(false);
            setIsLoading(false);
          }
        }
      } catch (err: any) {
        console.error('Error fetching user store request:', err);
        toast.error('Không thể kiểm tra trạng thái yêu cầu cửa hàng');
        setIsLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Effect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await CategoryService.findAll();
        const activeCategories = response.categories.filter(
          (cat) => !cat.deleted_at,
        );
        setCategories(
          activeCategories.map((cat) => ({ id: cat._id, name: cat.name })),
        );
      } catch (err) {
        console.error('Error fetching categories:', err);
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Log state for debugging
  useEffect(() => {
    console.log(
      'Current state - isLoading:',
      isLoading,
      'pendingRequest:',
      pendingRequest,
      'shopInfo:',
      shopInfo,
      'productsLoading:',
      productsLoading,
    );
  }, [isLoading, pendingRequest, shopInfo, productsLoading]);

  // Conditional Rendering Logic for main content
  let mainContent = null;

  if (isLoading) {
    mainContent = <StoreLoadingState />;
  } else if (pendingRequest) {
    mainContent = <StoreRequestStatusState request={pendingRequest} />;
  } else if (shopInfo) {
    mainContent = (
      <ApprovedStoreView
        shopInfo={shopInfo}
        products={products}
        productsLoading={productsLoading}
        categories={categories}
        isStoreSettingsOpen={isStoreSettingsOpen}
        setIsStoreSettingsOpen={setIsStoreSettingsOpen}
        handleStoreEdit={handleStoreEdit}
        handleStoreDelete={handleStoreDelete}
        handleAddProduct={handleAddProduct}
        isAddModalOpen={isAddModalOpen}
        handleCloseModals={handleCloseModals}
        handleAddProductSubmit={handleAddProductSubmit}
        isAddingProduct={isAddingProduct}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteProduct={handleDeleteProduct}
        isEditModalOpen={isEditModalOpen}
        selectedProduct={selectedProduct}
        handleUpdateProduct={handleUpdateProduct}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  } else {
    mainContent = <NotExistStore />;
  }

  return (
    <>
      {mainContent}

      {/* Modals (Always render, visibility controlled by state) */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        categories={categories}
        onSubmit={handleAddProductSubmit}
        isLoading={isAddingProduct}
      />

      {/* Edit Store Modal */}
      <EditStoreModal
        isOpen={isEditStoreModalOpen}
        onClose={() => setIsEditStoreModalOpen(false)}
        onSubmit={handleUpdateStore}
        storeData={shopInfo as any}
        isLoading={isUpdatingStore}
      />

      {/* Delete Store Modal */}
      <DeleteStoreModal
        isOpen={isDeleteStoreModalOpen}
        onClose={() => setIsDeleteStoreModalOpen(false)}
        onConfirm={handleConfirmDeleteStore}
        storeName={shopInfo?.name || ''}
        isLoading={isDeletingStore}
      />
    </>
  );
};

export default StoreView;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  FaCartPlus,
  FaUserCircle,
  FaSearch,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTimes,
  FaBars,
  FaChevronDown,
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaWallet,
  FaUserShield,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState('Toàn Quốc');
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { items } = useCart();
  const totalQuantity = new Set(items.map((item) => item.id)).size;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success('Đăng xuất thành công');
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#B86B2B] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-[#FFD600]" />
                <span>Hotline: 1900-xxxx</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-[#FFD600]" />
                <span>Giao hàng toàn quốc</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/ve-chung-toi"
                className="hover:text-[#FFD600] transition"
              >
                Về chúng tôi
              </Link>
              <Link href="/lien-he" className="hover:text-[#FFD600] transition">
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-[#B86B2B]">
                  GiaDụng
                </span>
                <span className="text-xs text-[#7A5C3E] font-medium tracking-wide">
                  Mua sắm tiện nghi mỗi ngày
                </span>
              </div>
            </Link>

            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full border border-[#E5E3DF] focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 outline-none transition"
                  placeholder="Tìm kiếm sản phẩm gia dụng..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  <FaSearch size={20} />
                </button>
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <Link href="/gio-hang" className="relative group">
                <FaCartPlus
                  size={24}
                  className="text-[#7A5C3E] group-hover:text-[#B86B2B] transition"
                />
                <span className="absolute -top-2 -right-2 bg-[#B86B2B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              </Link>
              {session ? (
                <>
                  <div className="relative">
                    <button
                      className="group flex items-center space-x-2 focus:outline-none"
                      onClick={() => setIsProfileDropdownOpen((v) => !v)}
                    >
                      <div className="relative w-8 h-8 rounded-full bg-[#F5E9DA] flex items-center justify-center overflow-hidden">
                        {/* {session.user?.avatar ? (
                          <Image
                            src={session.user.avatar}
                            alt={session.user.name || 'User avatar'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FaUserCircle
                            size={24}
                            className="text-[#7A5C3E] group-hover:text-[#B86B2B] transition"
                          />
                        )} */}
                      </div>
                      <FaChevronDown
                        size={14}
                        className={`text-[#7A5C3E] group-hover:text-[#B86B2B] transition-transform duration-300 ${
                          isProfileDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg py-2 z-50 border border-[#E5E3DF] transform origin-top-right transition-all duration-200 ease-out">
                        <div className="px-4 py-3 border-b border-[#E5E3DF]">
                          <p className="text-sm font-semibold text-[#7A5C3E]">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {session.user?.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-2.5 text-[#7A5C3E] hover:bg-[#F5E9DA] transition-colors duration-200"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <FaUser className="mr-3 text-[#B86B2B]" size={16} />
                            <span>Trang cá nhân</span>
                          </Link>
                          <Link
                            href="/cua-hang"
                            className="flex items-center px-4 py-2.5 text-[#7A5C3E] hover:bg-[#F5E9DA] transition-colors duration-200"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <FaBox className="mr-3 text-[#B86B2B]" size={16} />
                            <span>Quản lý cửa hàng</span>
                          </Link>
                          <Link
                            href="/quan-ly-vi-tien"
                            className="flex items-center px-4 py-2.5 text-[#7A5C3E] hover:bg-[#F5E9DA] transition-colors duration-200"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <FaWallet
                              className="mr-3 text-[#B86B2B]"
                              size={16}
                            />
                            <span>Quản lý ví tiền</span>
                          </Link>
                          <Link
                            href="/mua"
                            className="flex items-center px-4 py-2.5 text-[#7A5C3E] hover:bg-[#F5E9DA] transition-colors duration-200"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <FaBox className="mr-3 text-[#B86B2B]" size={16} />
                            <span>Đơn mua</span>
                          </Link>
                          {session?.user?.role === 'admin' && (
                            <Link
                              href="/admin"
                              className="flex items-center px-4 py-2.5 text-[#7A5C3E] hover:bg-[#F5E9DA] transition-colors duration-200"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <FaUserShield
                                className="mr-3 text-[#B86B2B]"
                                size={16}
                              />
                              <span>Quản trị viên</span>
                            </Link>
                          )}
                          <button
                            className="flex items-center w-full px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors duration-200"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              handleSignOut();
                            }}
                          >
                            <FaSignOutAlt className="mr-3" size={16} />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="hidden md:block bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-6 py-2.5 rounded-full transition"
                    onClick={() => router.push('/cua-hang')}
                  >
                    Đăng bán
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/dang-nhap"
                    className="hidden md:flex items-center justify-center whitespace-nowrap px-6 py-2.5 rounded-full border-2 border-[#B86B2B] text-[#B86B2B] hover:bg-[#B86B2B] hover:text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="hidden md:flex items-center justify-center whitespace-nowrap px-6 py-2.5 rounded-full bg-[#B86B2B] text-white hover:bg-[#E6A15A] font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#7A5C3E] hover:text-[#B86B2B] transition"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBars size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Hidden on Mobile */}
      <div className="hidden md:block border-t border-[#E5E3DF]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#7A5C3E] hover:text-[#B86B2B] font-medium transition"
              >
                Trang chủ
              </Link>
              <Link
                href="/san-pham"
                className="text-[#7A5C3E] hover:text-[#B86B2B] font-medium transition"
              >
                Sản phẩm
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu with Headless UI */}
      <Transition.Root show={isMobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      {/* Header */}
                      <div className="px-4 py-6 bg-[#B86B2B] sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-2xl font-bold text-white">
                            Menu
                          </Dialog.Title>
                          <button
                            type="button"
                            className="text-white hover:text-[#FFD600] transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <FaTimes size={24} />
                          </button>
                        </div>
                      </div>

                      {/* Mobile Search */}
                      <div className="px-4 py-4 border-b border-[#E5E3DF]">
                        <form
                          onSubmit={handleSearch}
                          className="relative group"
                        >
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-full border border-[#E5E3DF] focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 outline-none transition-all duration-300 group-hover:border-[#B86B2B]/50"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C3E] hover:text-[#B86B2B] transition-all duration-300 hover:scale-110"
                          >
                            <FaSearch size={20} />
                          </button>
                        </form>
                      </div>

                      {/* Mobile Navigation */}
                      <div className="flex-1 overflow-y-auto px-4 py-6">
                        <nav className="flex flex-col space-y-2">
                          <Link
                            href="/"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Trang chủ
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                          <Link
                            href="/products"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Sản phẩm
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                          <Link
                            href="/promotions"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Khuyến mãi
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                          <Link
                            href="/brands"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Thương hiệu
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                          <Link
                            href="/ve-chung-toi"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Về chúng tôi
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                          <Link
                            href="/lien-he"
                            className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#B86B2B]/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative z-10 text-[#7A5C3E] group-hover:text-[#B86B2B] font-medium transition-colors duration-300">
                              Liên hệ
                            </span>
                            <span className="absolute inset-0 bg-[#B86B2B]/0 group-hover:bg-[#B86B2B]/5 rounded-lg transition-all duration-300"></span>
                          </Link>
                        </nav>
                      </div>

                      {/* Mobile Bottom Actions */}
                      <div className="border-t border-[#E5E3DF] px-4 py-6 flex flex-col gap-4">
                        {session ? (
                          <div className="space-y-4">
                            <div className="px-4 py-2 bg-[#F5E9DA] rounded-lg">
                              <p className="text-sm font-medium text-[#7A5C3E]">
                                {session.user?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {session.user?.email}
                              </p>
                            </div>
                            <Link
                              href="/profile"
                              className="w-full bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center flex items-center justify-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Trang cá nhân
                            </Link>
                            <button
                              className="w-full bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                router.push('/cua-hang');
                              }}
                            >
                              Đăng bán
                            </button>
                            {session?.user?.role === 'admin' && (
                              <Link
                                href="/admin"
                                className="w-full bg-[#4A5568] hover:bg-[#2D3748] text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center flex items-center justify-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <FaUserShield className="mr-2" size={16} />
                                Quản trị viên
                              </Link>
                            )}
                            <button
                              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleSignOut();
                              }}
                            >
                              Đăng xuất
                            </button>
                          </div>
                        ) : (
                          <>
                            <Link
                              href="/dang-nhap"
                              className="w-full border-2 border-[#B86B2B] text-[#B86B2B] hover:bg-[#B86B2B] hover:text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center flex items-center justify-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Đăng nhập
                            </Link>
                            <Link
                              href="/dang-ky"
                              className="w-full bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-0 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center flex items-center justify-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Đăng ký
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;

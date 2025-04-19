'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-2xl font-bold">
                <span className="text-[#FF4B91]">RAF</span>
                <span>CART</span>
              </h1>
            </Link>
            <p className="text-gray-600 mb-4">
              Lorem ipsum, or lipsum as it is sometimes kno wn, is dummy text
              used in laying out print, gra phic or web designs.
            </p>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MY ACCOUNT</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-account"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Manage Account
                </Link>
              </li>
              <li>
                <Link
                  href="/return-order"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Return Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Terms & condition
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-[#FF4B91]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <svg
                  className="w-6 h-6 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  7895 Dr New Albuquerue, NM 19800, United States Of America
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+566 477 256, +566 254 575</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@domain.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Payment Methods */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © RAFCART - All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <Image
                src="/images/payment/visa.png"
                alt="Visa"
                width={40}
                height={25}
              />
              <Image
                src="/images/payment/mastercard.png"
                alt="Mastercard"
                width={40}
                height={25}
              />
              <Image
                src="/images/payment/paypal.png"
                alt="PayPal"
                width={40}
                height={25}
              />
              <Image
                src="/images/payment/skrill.png"
                alt="Skrill"
                width={40}
                height={25}
              />
              <Image
                src="/images/payment/maestro.png"
                alt="Maestro"
                width={40}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

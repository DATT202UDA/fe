'use client';

import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { FiMenu } from 'react-icons/fi';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  activePage?: string;
  title: string;
}

export const ProfileLayout = ({ 
  children, 
  activeSection = 'account',
  activePage = 'profile',
  title 
}: ProfileLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-30">
        <button onClick={toggleSidebar} className="text-gray-600">
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">
          <span className="text-pink-500">RAF</span>
          <span>CART</span>
        </h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Sidebar with mobile responsiveness */}
      <div className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <Sidebar activeSection={activeSection} activePage={activePage} />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:p-8 p-4 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <span className="text-pink-500">My Account</span>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl font-semibold mb-6">{title}</h1>

          {children}
        </div>
      </div>
    </div>
  );
}; 
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axiosInstance from '@/lib/axios';
import ProfileService from '@/services/ProfileService';

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  role: string;
  balance: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
}

interface InfoContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  refreshUserInfo: () => Promise<void>;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(userInfo, 'userInfo');

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProfileService.getProfile();
      console.log(response, 'response');
      setUserInfo(response);
    } catch (err) {
      setError('Failed to fetch user information');
      console.error('Error fetching user info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUserInfo();
    } else {
      setUserInfo(null);
      setLoading(false);
    }
  }, [session]);

  const refreshUserInfo = async () => {
    await fetchUserInfo();
  };

  const value = {
    userInfo,
    loading,
    error,
    refreshUserInfo,
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
}

export function useInfo() {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error('useInfo must be used within an InfoProvider');
  }
  return context;
}

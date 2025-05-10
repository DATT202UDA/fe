'use client';

import Footer from '../Footer';
import Header from '../Header';

interface Props {
  children: React.ReactNode;
}

export const GuestLayoutRouter: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

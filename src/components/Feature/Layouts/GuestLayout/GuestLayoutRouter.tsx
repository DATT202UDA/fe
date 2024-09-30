'use client';

interface Props {
  children: React.ReactNode;
}

export const GuestLayoutRouter: React.FC<Props> = ({ children }) => {
  return (
    <div>
      This is the guest layout router
      <div>{children}</div>
    </div>
  );
};

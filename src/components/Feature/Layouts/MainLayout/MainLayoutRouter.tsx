'use client';

interface Props {
  children: React.ReactNode;
}

export const MainLayoutRouter: React.FC<Props> = ({ children }) => {
  return (
    <div>
      This is the main layout router
      <div>{children}</div>
    </div>
  );
};

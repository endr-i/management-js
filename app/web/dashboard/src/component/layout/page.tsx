import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout: FC<{ children?: ReactElement }> = ({ children }) => {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
}

export default PageLayout;

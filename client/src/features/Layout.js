import React from 'react';
import BackButton from './BackButton';

function Layout({ children }) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  );
}

export default Layout;

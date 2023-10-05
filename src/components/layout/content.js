import React from 'react';

const Content = ({ children }) => {
  return (
    <div className="bg-white min-h-screen p-4 text-black">
      {children}
    </div>
  );
};

export default Content;

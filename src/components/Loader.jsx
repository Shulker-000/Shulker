import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-900 bg-opacity-50 fixed inset-0 z-50">
      <div className="flex-center flex-col">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-lg">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;

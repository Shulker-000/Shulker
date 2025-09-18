import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-50 bg-opacity-90 fixed inset-0 z-50">
      <div className="flex-center flex-col">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="mt-4 text-gray-800 text-lg">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;

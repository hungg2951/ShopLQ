 'use client';

import { ToastContainer } from 'react-toastify';

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light" // hoặc 'dark'
    />
  );
};

export default ToastProvider;

"use client";
import AuthForm from '@/components/client/authForm';
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    setLoading(true);
    console.log('Register with:', values);
    // Gọi API register ở đây
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return <AuthForm type="register" onSubmit={handleRegister} loading={loading} />;
};

export default RegisterPage;

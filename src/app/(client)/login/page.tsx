"use client";
import AuthForm from '@/components/client/authForm';
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    console.log('Login with:', values);
    // Gọi API login ở đây
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} />;
};

export default LoginPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return <DashboardLayout />;
}

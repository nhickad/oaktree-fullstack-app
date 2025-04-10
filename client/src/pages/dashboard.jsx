import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false); // wait until verified

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthorized(true);
      } catch (err) {
        localStorage.removeItem('token');
        router.replace('/login');
      }
    };

    verifyToken();
  }, [router]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  return <DashboardLayout />;
}

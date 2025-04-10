import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
          router.replace('/login'); // not authenticated
          return;
        }

        try {
          // verify token with backend
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected`, {
            headers: { Authorization: `Bearer ${token}` },
          });          
        } catch (err) {
          localStorage.removeItem('token'); // invalid/expired token
          router.replace('/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

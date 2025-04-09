import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // redirect to login page
  }, []);

  return null; // don't show anything here
}

import { Button } from '@mantine/core';
import Link from 'next/link';

import { auth } from '@/config/auth';

const Homepage = async () => {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-2">
      Hello, world!
      <Button component={Link} href="/api/auth/signout">
        login
      </Button>
      {JSON.stringify(session)}
    </main>
  );
};

export default Homepage;

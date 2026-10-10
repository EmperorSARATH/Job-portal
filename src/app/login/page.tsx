

// app/login/page.tsx
import LoginClient from './LoginClient';


export const metadata = {
  title: 'Login to Your Account',
};

export default function LoginPage() {
  return (
    <main className="">
      <LoginClient />
    </main>
  );
}

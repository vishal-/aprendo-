import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Aprendo - Practice. Learn. Excel.",
  description: "The ultimate platform for teachers and students to create and take tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

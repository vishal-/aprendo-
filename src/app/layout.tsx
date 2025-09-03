import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

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
      <body className="bg-gray-900 text-white">
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

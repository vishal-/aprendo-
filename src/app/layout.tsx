import type { Metadata } from "next";
import "@/app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Aprendo - Practice. Learn. Excel.",
  description:
    "The ultimate platform for teachers and students to create and take tests.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <AuthProvider>
          <AuthGuard>
            <Header />
            <main className="min-h-[calc(100vh-200px)]">{children}</main>
            <Footer />
            <ToastContainer />
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

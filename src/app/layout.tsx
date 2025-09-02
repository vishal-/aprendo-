import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mess Management",
  description: "Mess Management Web App",
  facebook: {
    appId: "tamiz.uddin.09",
  },
  icons: {
    icon: {
      type: "image/x-icon",
      url: "/kb.png",
    },
    shortcut: {
      url: "/kb.png",
    },
    apple: {
      url: "/kb.png",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

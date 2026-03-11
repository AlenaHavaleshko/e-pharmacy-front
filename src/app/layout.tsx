import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import TanStackProvider from '@/src/components/TanStackProvider/TanStackProvider';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: 'E-PHARMACY',
  description: 'E-PHARMACY',
  icons: {
    icon: '/favicon.cvg.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          <div className="container"> {children}</div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

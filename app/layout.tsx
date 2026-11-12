import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'پروفایل من',
  description: 'صفحه پروفایل فارسی و پنل ویرایش نمایشی',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

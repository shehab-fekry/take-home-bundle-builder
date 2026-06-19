import localFont from 'next/font/local'
import './globals.css';
import TanstackQeury from '@/src/components/providers/tanstack-query';

const Gilroy = localFont({
  src: '../public/fonts/Gilroy-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--gilroy-regular'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body
        className={`${Gilroy.className} ${Gilroy.variable} antialiased`}
      >
        <TanstackQeury>
          {children}
        </TanstackQeury>
      </body>
    </html>
  );
}

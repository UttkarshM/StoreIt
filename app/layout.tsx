import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers'; // make sure this path is correct

export const metadata: Metadata = {
  title: 'Drive',
  description: 'Google Drive Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

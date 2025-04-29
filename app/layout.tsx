// import type { Metadata } from 'next';
// import { Geist, Poppins } from 'next/font/google';
// import './globals.css';
// // import { ReduxProvider } from '@/redux/provider';
// import { Providers } from './providers';

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   variable: '--font-poppins',
// });

// export const metadata: Metadata = {
//   title: 'Drive',
//   description: 'Google Drive Clone',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${poppins.variable} font-poppins antialiased min-w-[600px]`}
//       >
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

// app/providers.tsx
// app/layout.tsx
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

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HuleEdu: The Essay-Scoring System',
  description:
    'A public research overview of the HuleEdu essay-scoring system, its methods, evaluation, and data flow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

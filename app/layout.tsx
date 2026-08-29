import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Resume Maker — Professional ATS-Friendly Resume Builder',
  description:
    'Create polished, ATS-compliant resumes in minutes. Built for college students, fresh graduates, and experienced professionals with live A4 preview, AI writing assistance, and high-quality PDF downloads.',
  keywords: [
    'resume maker',
    'ats resume builder',
    'student resume',
    'fresher resume format',
    'professional cv builder',
    'free pdf resume download',
  ],
  authors: [{ name: 'Resume Maker Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-primary-text font-sans antialiased selection:bg-primary-light selection:text-primary">
        <ResumeProvider>
          <div className="no-print">
            <Navbar />
          </div>
          <main className="flex-1 flex flex-col">{children}</main>
          <div className="no-print">
            <Footer />
          </div>
        </ResumeProvider>
      </body>
    </html>
  );
}

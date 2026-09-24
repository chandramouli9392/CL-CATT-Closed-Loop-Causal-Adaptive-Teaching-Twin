import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CL-CATT — Closed-Loop Causal Adaptive Teaching Twin Platform',
  description: 'A Cognitive Digital Twin Framework for Adaptive Teaching using Causal Reasoning, Policy Simulation, Teacher-in-the-Loop Learning, and Continuous Explanation Memory.',
  authors: [{ name: 'Chandramouli Boppana', url: 'https://mbu.edu.in' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

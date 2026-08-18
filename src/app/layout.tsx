import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description: "Create, analyze, improve, and optimize resumes using AI",
  alternates: {
    canonical: "https://resume-ai-pi-blue.vercel.app",
  },
  openGraph: {
    title: "ResumeAI - AI-Powered Resume Builder",
    description: "Create, analyze, improve, and optimize resumes using AI",
    url: "https://resume-ai-pi-blue.vercel.app",
    siteName: "ResumeAI",
    type: "website",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ResumeAI",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://resume-ai-pi-blue.vercel.app",
  "description": "AI-powered resume builder, analyzer, and optimizer",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}

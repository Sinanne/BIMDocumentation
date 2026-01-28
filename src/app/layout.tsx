import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIMDocs - Modern BIM Documentation",
  description: "A comprehensive guide to Building Information Modeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.variable}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

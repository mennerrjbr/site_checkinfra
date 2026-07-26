import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Checkinfra Setup",
  description: "Checkinfra site institucional",
};

export function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${inter.variable} antialiased`}>
      <body className="font-sans min-h-screen flex flex-col bg-brand-light text-brand-text-main">
        {children}
      </body>
    </html>
  );
}

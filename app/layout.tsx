import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zahraa-mahmood.vercel.app"),
  title: "Zahraa Mahmood — Backend & Cloud Engineer",
  description:
    "Backend-focused full-stack engineer building scalable services, payment systems, integrations, and AWS cloud infrastructure.",
  openGraph: {
    title: "Zahraa Mahmood | Backend & Cloud Engineer",
    description: "Building reliable systems behind exceptional products.",
    type: "website",
    url: "https://zahraa-mahmood.vercel.app",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

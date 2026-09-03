import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Live and demo weather dashboard for Sri Lanka",
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
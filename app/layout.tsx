import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./shared/navbar";
import ToasterContext from "./shared/ui/toasterContext";
import { Theme } from "./shared/providers/themeProvider";

const geistSans = localFont({
  src: "./shared/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./shared/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Taks Manager",
  description: "A simple task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="es" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[rgb(13,3,40)]`}
        >
          <Theme>
            <ToasterContext />

            <Navbar />

            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}

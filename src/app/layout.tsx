import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opal",
  description: "Share AI powered videos with your friends",
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-[#171717] text-white`}>
          <ReduxProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

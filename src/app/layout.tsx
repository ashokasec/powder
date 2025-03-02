import type { Metadata } from "next";
import "./globals.css";
import { APP } from "@/config";
import { geist_mono, geist_sans } from "@/lib/fonts";
import Provider from "@/components/ui/provider";

export const metadata: Metadata = {
  title: `${APP.name} : No Hints`,
  description: "lol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist_sans.variable} ${geist_mono.variable} antialiased bg-cover bg-no min-h-screen`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

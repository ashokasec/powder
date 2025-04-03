import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "@/lib/constants/app"
import { geist_mono, geist_sans } from "@/lib/misc/fonts";
import Provider from "@/components/ui/provider";

export const metadata: Metadata = {
  title: `${APP_NAME} : No Hints`,
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
        className={`${geist_sans.variable} ${geist_mono.variable} antialiased bg-cover bg-no min-h-screen overflow-x-hidden`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

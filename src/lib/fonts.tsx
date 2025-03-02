import {
  Bricolage_Grotesque,
  Inter,
  Epilogue,
  Space_Grotesk,
  Geist,
  Geist_Mono,
} from "next/font/google";

export const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
export const epilogue = Epilogue({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });
export const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
export const geist_sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

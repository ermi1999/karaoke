import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TracksProvider } from "@/components/tracksContext";

const generalSans = localFont({
  src: "../public/fonts/GeneralSans_Complete/Fonts/OTF/GeneralSans-Medium.otf",
  variable: "--general-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased font-regular`}>
        <TracksProvider>{children}</TracksProvider>
      </body>
    </html>
  );
}

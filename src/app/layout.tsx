import type { Metadata } from "next";
//import localFont from "next/font/local";
//import "./globals.css";
import "./styles/styles.scss";

/*const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.woff2",
  variable: "--font-nunito-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //className={`${nunito.variable} ${geistMono.variable}`}
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

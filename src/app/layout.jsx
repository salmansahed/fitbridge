import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { ToastContainer } from "react-toastify";
import NextThemeProvider from "@/providers/NextThemeProvider";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin_sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | FitBridge",
    default: "FitBridge",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ToastContainer />
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}

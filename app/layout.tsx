import type { ReactNode } from "react";
import type { Metadata } from "next";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import { Mulish } from "next/font/google";
import GlobalSnackbar from "@/components/GlobalSnackbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Simple Movie",
  description: "Simple Movie Project By Nott Nott",
};

interface AppProps {
  readonly children: ReactNode;
}

const mulish = Mulish({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ children }: AppProps) {
  return (
    <StoreProvider>
      <html lang="en" className={mulish.className}>
        <body>
          <Providers>
            {children}
            <GlobalSnackbar />
          </Providers>
        </body>
      </html>
    </StoreProvider>
  )
}

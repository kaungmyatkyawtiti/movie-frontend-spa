import type { ReactNode } from "react";
import type { Metadata } from "next";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Mulish } from "next/font/google";
import theme from "./theme";
import GlobalSnackbar from "@/components/GlobalSnackbar";

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
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              {children}
              <GlobalSnackbar />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  )
}

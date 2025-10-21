"use client";

import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@emotion/react";
import Nav from "./components/Nav";
import GlobalSnackbar from "./components/GlobalSnackbar";
import { Noto_Sans } from "next/font/google";
import theme from "./theme";

interface AppProps {
  readonly children: ReactNode;
}

const notoSans = Noto_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ children }: AppProps) {
  return (
    <StoreProvider>
      <html lang="en" className={notoSans.className}>
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <section className={styles.container}>
                <Nav />
                <main>
                  <GlobalSnackbar />
                  {children}
                </main>
              </section>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  )
}

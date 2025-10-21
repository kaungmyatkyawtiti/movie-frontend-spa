import type { ReactNode } from "react";
import { Metadata } from "next";
import App from "./app";

export const metadata: Metadata = {
  title: "My Movie",
  description: "idk anymore",
};

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <App>
      {children}
    </App>
  );
}

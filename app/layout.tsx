import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "DeathGuess — How many died?";
const description =
  "Estime o número de vítimas de acontecimentos que marcaram a história e descubra quão perto você consegue chegar.";

export const metadata: Metadata = {
  metadataBase: new URL("https://deathguess.vercel.app"),
  title,
  description,
  applicationName: "DeathGuess",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "DeathGuess",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

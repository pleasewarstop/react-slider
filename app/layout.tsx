import type { Metadata } from "next";
import { ScaleProvider } from "@/components/ScaleContainer/ScaleProvider";
import "@fontsource/poppins";
import "@fontsource/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Slider",
  description: "Slider app on Next",
};

const MAX_WIDTH = 1920;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScaleProvider maxWidth={MAX_WIDTH}>{children}</ScaleProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";

/* Styles */
import "../styles/globals.css";

/* React Query */
import { queryClient } from "@src/queryClient";

/* Types */
import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "700", "600", "500", "400"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={inter.variable}>
        <Component {...pageProps} />;
      </main>
    </QueryClientProvider>
  );
}

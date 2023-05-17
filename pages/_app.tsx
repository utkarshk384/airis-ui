import { useMemo } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

/* Styles */
import "../styles/globals.css";

/* React Query */
import { queryClient } from "@src/queryClient";

/* Components */
import { defaultOptions } from "@components";

/* Types */
import type { AppProps } from "next/app";
import { RouteGuard } from "@components/RouteGuard";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "700", "600", "500", "400"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const defaultToastOpts = useMemo(() => defaultOptions, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={inter.variable}>
        <RouteGuard>
          <Component {...pageProps} />;
        </RouteGuard>
      </main>
      <Toaster toastOptions={defaultToastOpts} />
    </QueryClientProvider>
  );
}

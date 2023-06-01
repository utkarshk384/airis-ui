import { useMemo } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

/* Styles */
import "../styles/globals.css";
import "react-day-picker/dist/style.css";
import "react-quill/dist/quill.snow.css";
import "tippy.js/dist/tippy.css"; // optional

/* React Query */
import { queryClient } from "@src/queryClient";

/* Components */
import { defaultOptions } from "@components";
import { RouteGuard } from "@components/RouteGuard";

/* Types */
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "700", "600", "500", "400"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const defaultToastOpts = useMemo(() => defaultOptions, []);

  /* Get available layouts */
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={inter.variable}>
        <RouteGuard>{getLayout(<Component {...pageProps} />)}</RouteGuard>
      </main>
      <Toaster toastOptions={defaultToastOpts} />
    </QueryClientProvider>
  );
}

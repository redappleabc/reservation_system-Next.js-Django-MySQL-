"use client"

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ScrollToTop from "../components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import { Noto_Sans_JP } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "../components/common/header/Header";
import MobileMenu from "../components/common/header/MobileMenu";
import PopupSignInUp from "../components/common/PopupSignInUp";
import ToasterProvider from "./providers/ToasterProvider";
import Loading from "./loading";

import { setUserAndAuthenticate } from "@/store/slices/authSlice";
import { frontendAxiosInstance } from "@/utils/http-common";

config.autoAddCss = false;

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const AppContent = ({ children }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = async () => {
    try {
      const res = await frontendAxiosInstance.get('auth/get-token');
      const isAuthenticate = res.data.isAuthenticate;
      const user = res.data.user;
      dispatch(setUserAndAuthenticate({ isAuthenticate, user }));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchToken();
    setIsLoading(false);
  }, [])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <ToasterProvider />
      <Header />
      <MobileMenu />
      <PopupSignInUp />
      {children}
    </>
  )
}

export default function RootLayout({ children }) {

  return (
    <html lang="ja" data-bs-theme="light">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={notoSans.className}>
        <Provider store={store}>
          <AppContent>
            {children}
          </AppContent>
        </Provider>
        <ScrollToTop />
      </body>
    </html>
  );
}

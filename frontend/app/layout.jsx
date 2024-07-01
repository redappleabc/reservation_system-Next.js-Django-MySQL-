'use client';

import { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import ScrollToTop from "../components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import { Noto_Sans_JP } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import MobileMenu from "../components/common/header/MobileMenu";
import PopupSignInUp from "../components/common/PopupSignInUp";
import SidebarMenu from "../components/common/header/SidebarMenu";
import { usePathname } from 'next/navigation';
import ToasterProvider from "./providers/ToasterProvider";

import { loginWithToken } from "@/store/slices/authSlice";

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
  const { token } = useSelector(state => state.auth);

  const [initialize, setInitialize] = useState(true);

  useEffect(() => {
    dispatch(loginWithToken());
  }, [])

  const pathname = usePathname();

  const isContainedDashboard = pathname.includes('dashboard');

  return (
    <>
      <ToasterProvider />
      <Header />
      <MobileMenu />
      <PopupSignInUp />
      {children}
      {!isContainedDashboard && <Footer />}
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

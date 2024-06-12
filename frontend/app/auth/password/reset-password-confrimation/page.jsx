"use client";

import ResetPasswordConfirmation from "@/components/ResetPasswordConfirmation";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import MobileMenu from "@/components/common/header/MobileMenu";

export default function Home() {
  return (
    <>
      <Header />
      <MobileMenu />
      <PopupSignInUp />
      <BreadCrumbBanner />
      <section className="our-log bgc-fa">
        <div className="container">
          <div className="row  ">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <div className="login_form  inner_page">
                <ResetPasswordConfirmation />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
}
'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import SidebarMenu from "@/components/common/header/SidebarMenu";
import Footer from "@/components/common/footer/Footer";
import DashboardNavigation from "./DashboardNavigation";

const DashboardLayout = ({ children }) => {

  return (
    <div>
      <SidebarMenu />
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <DashboardNavigation />
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DashboardLayout;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import properties from "@/data/properties";
import DetailsContent from "@/components/listing-details-v1/DetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingOne from "@/components/listing-single/ListingOne";
import Loading from "@/app/loading";

import { frontendAxiosInstance } from "@/utils/http-common";

const ListingDynamicDetailsV1 = ({ params }) => {

  const id = params.id;

  const [service, setService] = useState({});
  const [viewersCount, setViewersCount] = useState(0);
  const [initial, setInitial] = useState(true);

  const fetchServiceDetailInfo = async (serviceId) => {
    try {
      const res = await frontendAxiosInstance.get(`allService/detail/${serviceId}`);
      const serviceInfo = res.data.result.service;
      console.log(res.data.result);
      setService(serviceInfo);
      setViewersCount(res.data.result.viewersCount);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchServiceDetailInfo(id);
    setInitial(false);
  }, [id]);

  if (initial) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <ListingOne property={service} />

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <DetailsContent />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default ListingDynamicDetailsV1;

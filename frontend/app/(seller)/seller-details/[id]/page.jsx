"use client";

import agents from "@/data/agents";
import BreadCrumb2 from "@/components/seller-details/BreadCrumb2";
import SidebarListings from "@/components/seller-details/SidebarListings";
import TabDetailsContent from "@/components/seller-details/TabDetailsContent";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import Ratings from "@/components/blog-details/Ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";
import { useState } from "react";

const AgentDetailsDynamic = ({ params }) => {
  const id = params.id;
  const agent = agents.find((item) => item.id == id) || agents[0];
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [number, setNumber] = useState(0);

  const handleHeartInCreaing = () => {
    setIsButtonDisabled(true);
    setNumber(number + 1);
  };
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <BreadCrumb2 />
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="feat_property list style2 agent align-items-start">
                    <div className="seller-info">
                      <div className="thumb">
                        <Image
                          width={286}
                          height={220}
                          className="img-whp w-100 h-100 cover"
                          src={agent?.img}
                          alt={agent?.img}
                        />
                      </div>
                      <div className="sub-detail">
                        <div className="mt10 d-flex align-items-center justify-content-between">
                          <div className="level-btn">
                            {agent?.noOfListings} レベル
                          </div>
                          <button
                            type="button"
                            className="twitter-btn rounded btn btn-dark"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                            リポスト
                          </button>
                        </div>
                        <div className="thanks-btn-area">
                          <button
                            className="heart-icon"
                            onClick={handleHeartInCreaing}
                            disabled={isButtonDisabled}
                          >
                            <svg
                              data-v-40c08e7b=""
                              class="svg-inline--fa fa-heart KLop7"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="heart"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                class=""
                                fill="currentColor"
                                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                              ></path>
                            </svg>
                            いいね！
                          </button>
                          <div className="heart-number">
                            <div className="arrow-top"></div>
                            <div className="arrow-bottom"></div>
                            <div className="number">{number}</div>
                          </div>
                        </div>
                        <div className="sub-detail-info d-flex align-items-center justify-content-between">
                          <Ratings />
                          <ul className="prop_details mb0">
                            <li>
                              <a href="#">評価: {agent?.ratings}</a>
                            </li>
                            <li>
                              <a href="#">合計レビュ: {agent?.noOfListings}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h3>{agent?.name}<span className="text-thm seller-view-type">({agent?.type})</span></h3>
                        <h3 className="mt10">タイトルが入ります。タイトルが入ります。タイトルが入ります。</h3>
                        <p>
                          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
                          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="shop_single_tab_content style2 mt30">
                    <TabDetailsContent />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-4">
              <SidebarListings />
            </div>
            {/* End .col-lg-4 col-xl-4 content left side */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
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

export default AgentDetailsDynamic;

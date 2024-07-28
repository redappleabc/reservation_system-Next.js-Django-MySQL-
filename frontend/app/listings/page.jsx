"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Pagination from "@/components/common/blog/Pagination";
import FilterTopBar from "@/components/common/listing/FilterTopBar";
import GridListButton from "@/components/common/listing/GridListButton";
import ShowFilter from "@/components/common/listing/ShowFilter";
import SidebarListing from "@/components/common/listing/SidebarListing";
import BreadCrumb2 from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";
import Loading from "../loading";

import { frontendAxiosInstance } from "@/utils/http-common";

const Listings = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [initial, setInitial] = useState(true);

  const [allServices, setAllServices] = useState([]);
  const [maxPage, setMaxPage] = useState(29);
  const [allServiceCount, setAllServiceCount] = useState(0);
  const [isGridOrList, setIsGridOrList] = useState(false);

  const fetchAllServicesInfo = async (queryStr) => {
    try {
      const res = await frontendAxiosInstance.get(`allService/all?${queryStr}`);
      const resultServices = res.data.result.services;
      const allPages = res.data.result.allPages;
      const allServiceCount = res.data.result.allServiceCount;
      setAllServices(resultServices);
      setMaxPage(allPages);
      setAllServiceCount(allServiceCount);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (searchParams.get("page") && searchParams.get('page') > 0 && searchParams.get("sortType")) {
      const queryStr = searchParams.toString();
      fetchAllServicesInfo(queryStr);
      setInitial(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (!searchParams.get('page') || searchParams.get('page') <= 0) {
      params.set('page', 1);
    }
    if (searchParams.get('page') > maxPage) {
      params.set('page', maxPage);
    }

    if (!searchParams.get('sortType')) {
      params.set('sortType', 'recent');
    }

    const entries = searchParams.entries();

    for (const [key, value] of entries) {
      if (key === 'page' || key === 'sortType') {
        continue;
      }
      if (key === 'tags' && Array.isArray(value)) {
        params.delete(key);
        for (const item of value) {
          params.append(key, item);
        }
        continue;
      }
      params.set(key, value);
    }

    const queryStr = params.toString();
    router.push(`/listings?${queryStr}`);
  }, [searchParams])

  return (
    <>
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb2 />
            </div>
            <div className="col-lg-6 position-relative">
              <div className="listing_list_style mb20-xsd tal-991">
                <GridListButton isGridOrList={isGridOrList} setIsGridOrList={setIsGridOrList} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListing />
              </div>
              <div
                className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                tabIndex="-1"
                id="sidebarListing"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title">詳細検索</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <SidebarListing />
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result ">
                <div className="row align-items-center">
                  <FilterTopBar allServicesCount={allServiceCount} />
                </div>
              </div>
              <div className="row">
                <FeaturedItem isGridOrList={isGridOrList} services={allServices} setServices={setAllServices} />
              </div>
              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination maxPage={maxPage < 29 ? 29 : maxPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listings;
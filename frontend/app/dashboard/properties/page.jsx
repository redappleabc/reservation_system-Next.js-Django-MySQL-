"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Loading from "@/app/loading";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import DashboardNavigation from "../DashboardNavigation";

import { frontendAxiosInstance } from "@/utils/http-common";

const Properties = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);
  const [initial, setInitial] = useState(true);

  const [serviceList, setServiceList] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const fetchServiceListInfo = async (query) => {
    if (!user) {
      return;
    }
    try {
      const res = await frontendAxiosInstance.get(`service/${user.uuid}?${query}`);
      const maxPageNum = res.data.result.maxPage;
      const serviceListInfo = res.data.result.services;
      setMaxPage(maxPageNum);
      setServiceList(serviceListInfo);
    } catch (err) {
      toast.error(err.response?.data.error);
    }
  }

  useEffect(() => {
    if (searchParams.get("page") && searchParams.get('page') > 0 && searchParams.get("sortType")) {
      const queryStr = searchParams.toString();
      fetchServiceListInfo(queryStr);
      setInitial(false);
      return;
    }

    const entries = searchParams.entries();
    let page;
    if (!searchParams.get('page') || searchParams.get('page') <= 0) {
      page = 1;
    } else {
      page = searchParams.get('page');
    }
    const sortType = searchParams.get("sortType") || 'recent';
    let query = `page=${page}&sortType=${sortType}`;
    entries.forEach(([key, value], index) => {
      if (key !== 'page' && key !== 'sortType') {
        if (index === entries.length - 1) {
          query += `${key}=${value}`;
        } else {
          query += `${key}=${value}&`;
        }
      }
    });
    router.replace(`/dashboard/properties?${query}`);
  }, [searchParams, user])

  if (initial) {
    return (
      <Loading />
    )
  }

  return (
    <div className="row">
      <div className="col-lg-4 col-xl-4 mb10">
        <div className="breadcrumb_content style2 mb30-991">
          <h2 className="breadcrumb_title">My Favorites</h2>
          <p>We are glad to see you again!</p>
        </div>
      </div>
      <div className="col-lg-8 col-xl-8">
        <div className="candidate_revew_select style2 text-end mb30-991">
          <ul className="mb0">
            <li className="list-inline-item">
              <div className="candidate_revew_search_box course fn-520">
                <SearchBox />
              </div>
            </li>
            <li className="list-inline-item">
              <Filtering />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_dashboard_review mb40">
          <div className="property_table">
            <div className="table-responsive mt0">
              <TableData serviceList={serviceList} />
            </div>
            <div className="mbp_pagination">
              <Pagination maxPage={maxPage > 29 ? maxPage : 29} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;

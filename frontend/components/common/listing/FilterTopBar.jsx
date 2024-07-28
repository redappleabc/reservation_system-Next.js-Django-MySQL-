'use client'

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatured,
  addStatusType,
} from "../../../features/filter/filterSlice";

import { ServiceSortTypeList } from "@/utils/configInfo";

const FilterTopBar = ({ allServicesCount }) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    sortType: searchParams.get('sortType') || 'recent',
  })

  const makeQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const queryStr = params.toString();
    return queryStr;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    const queryStr = makeQuery(name, value);
    router.push(`/listings?${queryStr}`);
  }

  return (
    <>
      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
        <div className="left_area tac-xsd">
          <p>
            <span className={allServicesCount === 0 ? "text-danger" : undefined}>
              {allServicesCount}{" "}
            </span>
            {allServicesCount !== 0 ? (
              "Search results"
            ) : (
              <span className="text-danger">Not found results</span>
            )}
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-12 col-md-8 col-lg-8 col-xl-7">
        <div className="right_area text-end tac-xsd">
          <ul>
            {/* <li className="list-inline-item">
              <span className="stts">Status:</span>
              <select
                className="selectpicker show-tick"
                onChange={(e) => setStatus(e.target.value)}
                value={getStatus}
              >
                <option value="">All Status</option>
                <option value="old">Old</option>
                <option value="recent">Recent</option>
              </select>
            </li> */}
            <li className="list-inline-item">
              <span className="shrtby">Sort by:</span>
              <select
                className="selectpicker show-tick"
                name="sortType"
                value={formData.sortType}
                onChange={handleInputChange}
              >
                {
                  ServiceSortTypeList.map((item, index) => (
                    <option key={index} value={item.key}>{item.value}</option>
                  ))
                }
              </select>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default FilterTopBar;

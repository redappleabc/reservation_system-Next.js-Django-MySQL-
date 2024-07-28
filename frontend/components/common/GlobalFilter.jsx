"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import PricingRangeSlider from "./PricingRangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";
import Calendar from "../CalendarSearch";
import GlobalSelectBox from "./GlobalSelectBox";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";

import { paymethodList, PrefectureList } from "@/utils/configInfo";

const GlobalFilter = ({ className = "" }) => {

  const initialData = {
    keyword: "",
    startDate: "",
    endDate: "",
    startHour: "",
    startMinute: "",
    endHour: "",
    endMinute: "",
    prefecture: "",
    paymethod: "",
    min_point: 100,
    max_point: 20000,
  }

  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const entries = Object.entries(formData);
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of entries) {
      if (value) {
        params.set(key, value);
      }
    }
    const queryStr = params.toString();
    router.push(`/listings?${queryStr}`);
  };

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="キーワード"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
            />
          </div>
        </li>
        <li className="list-inline-item">
          <div className="small_dropdown2">
            <div
              id="prncgs"
              className="btn dd_btn"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>利用日時</span>
              <label htmlFor="InputEmail2">
                <span className="fa fa-calendar"></span>
              </label>
            </div>
            <div className="dd_content3 dropdown-menu">
              <div className="pricing_acontent">
                <Calendar formData={formData} setFormData={setFormData} />
              </div>
            </div>
          </div>
        </li>

        <li className="list-inline-item">
          <div className="candidate_revew_select">
            <select className="selectpicker w100 show-tick form-select" name="prefecture" value={formData.prefecture} onChange={handleInputChange}>
              <option value="">場所</option>
              {
                PrefectureList.map((item, index) => (
                  <option key={index} value={item.key}>{item.value}</option>
                ))
              }
            </select>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="candidate_revew_select">
            <select className="selectpicker w100 show-tick form-select" name="paymethod" value={formData.paymethod} onChange={handleInputChange}>
              <option>お支払い方法</option>
              {
                paymethodList.map((item, index) => (
                  <option key={index} value={item.key}>{item.name}</option>
                ))
              }
            </select>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="small_dropdown2">
            <div
              id="prncgs"
              className="btn dd_btn"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>価格</span>
              <label htmlFor="InputEmail2">
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <PricingRangeSlider formData={formData} setFormData={setFormData} />
              </div>
            </div>
          </div>
        </li>
        {/* <li className="custome_fields_520 list-inline-item">
          <div className="navbered">
            <div className="mega-dropdown ">
              <span
                className="dropbtn"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                詳細検索 <i className="flaticon-more pl10 flr-520"></i>
              </span>
              <div className="dropdown-content dropdown-menu ">
                <div className="row p15">
                  <div className="col-lg-12">
                    <h4 className="text-thm3 mb-4">タグ</h4>
                  </div>
                  <CheckBoxFilter tags={tags} setTags={setTags} />
                </div>
                <div className="row p15 pt0-xsd">
                  <div className="col-lg-12 col-xl-12">
                    <GlobalSelectBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              検索
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GlobalFilter;

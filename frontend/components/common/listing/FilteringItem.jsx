"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PricingRangeSlider from "../../common/PricingRangeSlider";
import flatpickr from "flatpickr";
import { Japanese } from "flatpickr/dist/l10n/ja";
import 'flatpickr/dist/flatpickr.min.css';

import { ServicePropertyList, AllMainCategories, AllTags, PrefectureList } from "@/utils/configInfo";

const FilteringItem = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialData = {
    keyword: searchParams.get('keyword') || "",
    prefecture: searchParams.get('prefecture') || "",
    serviceType: searchParams.get('serviceType') || "",
    mainCategory: searchParams.get('mainCategory') || "",
    startHour: searchParams.get('startHour') || "",
    startMinute: searchParams.get('startMinute') || "",
    endHour: searchParams.get('endHour') || "",
    endMinute: searchParams.get('endMinute') || "",
    paymethod: searchParams.get('paymethod') || "fixed",
    min_point: searchParams.get('min_point') || 100,
    max_point: searchParams.get('max_point') || 20000,
    tags: searchParams.getAll('tags') || [],
  }

  const [formData, setFormData] = useState(initialData);
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || "");
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || "");

  const makeArray = (length) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(i);
    }

    return array;
  }

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker7', {
      wrap: true,
      dateFormat: 'Y-m-d',
      minuteIncrement: 1,
      locale: Japanese,
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static',
      defaultDate: searchParams.get('startDate') || "",
      onValueUpdate: (selectedDates, dateStr, instance) => {
        setStartDate(dateStr);
      },
    });
    flatpickr('#datetimepicker8', {
      wrap: true,
      dateFormat: 'Y-m-d',
      minuteIncrement: 1,
      locale: Japanese,
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static',
      defaultDate: searchParams.get('endDate') || "",
      onValueUpdate: (selectedDates, dateStr, instance) => {
        setEndDate(dateStr);
      },
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('startDate', startDate);
    router.push(`/listings?${params.toString()}`);
  }, [startDate])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('endDate', endDate);
    router.push(`/listings?${params.toString()}`);
  }, [endDate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClickTagItem = (item) => {
    const selectedTags = formData.tags;
    const selectedIndex = selectedTags.findIndex(tag => tag === item.key);
    if (selectedIndex < 0) {
      selectedTags.push(item.key);
    } else {
      selectedTags.splice(selectedIndex, 1);
    }
    setFormData((prev) => ({
      ...prev,
      tags: selectedTags
    }))
  }

  const handleClearFilter = () => {
    setFormData(initialData);
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    const entries = Object.entries(formData);
    for (const [key, value] of entries) {
      if (value) {
        if (key === 'tags') {
          params.delete(key);
          for (const item of value) {
            params.append(key, item);
          }
          continue;
        }
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    const queryStr = params.toString();
    router.push(`/listings?${queryStr}`);
  }

  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="キーワード"
            name="keyword"
            value={formData.keyword}
            onChange={handleInputChange}
          />
          <label>
            <span className="flaticon-magnifying-glass"></span>
          </label>
        </div>
      </li>
      {/* End li */}

      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleInputChange}
            >
              <option value="">場所</option>
              {
                PrefectureList.map((item, index) => (
                  <option key={index} value={item.key}>{item.value}</option>
                ))
              }
            </select>
          </div>
        </div>
      </li>

      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
            >
              <option value="">サービスの種類</option>
              {
                ServicePropertyList.map((item, index) => (
                  <option key={index} value={item.key}>{item.name}</option>
                ))
              }
            </select>
          </div>
        </div>
      </li>
      {/* End li */}

      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleInputChange}
            >
              <option value="">カテゴリ検索</option>
              {
                AllMainCategories.map((item, index) => (
                  <option key={index} value={item.key}>{item.name}</option>
                ))
              }
            </select>
          </div>
        </div>
      </li>
      {/* End li */}

      <li className='mt-4'>
        <span>お支払い方法</span>
        <div className="form-group row align-items-center justify-content-center mx-0 my-2">
          <div className='row align-items-center justify-content-center' style={{ padding: '0px' }} >
            <div className="form-check col">
              <input className="form-check-input" type="checkbox" name="paymethod" id="flexRadioDefault1"
                value="minutely" checked={formData.paymethod === 'minutely'} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                毎分
              </label>
            </div>
            <div className="form-check col">
              <input className="form-check-input" type="checkbox" name="paymethod" id="flexRadioDefault2"
                value="daily" checked={formData.paymethod === 'daily'} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                一日
              </label>
            </div>
            <div className="form-check col">
              <input className="form-check-input" type="checkbox" name="paymethod" id="flexRadioDefault3"
                value="fixed" checked={formData.paymethod === 'fixed'} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                固定
              </label>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div className="small_dropdown2">
          <div
            id="prncgs2"
            className="btn dd_btn"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span>価格</span>
            <label htmlFor="prncgs2">
              <span className="fa fa-angle-down"></span>
            </label>
          </div>
          <div className="dd_content2 style2 dropdown-menu">
            <div className="pricing_acontent ">
              <PricingRangeSlider formData={formData} setFormData={setFormData} />
            </div>
          </div>
        </div>
      </li>

      <li>
        <div className="input-group date mb-3" id="datetimepicker7" data-target-input="nearest">
          <label htmlFor="datetimepicker7" className="pt-2 pr-2">開始日:</label>
          <div className="d-flex">
            <input type="text" data-input aria-hidden="false" className="form-control" data-target="#datetimepicker7" style={{ background: 'white' }} />
            <span className="input-group-text" data-toggle>
              <span className="fa fa-calendar"></span>
            </span>
          </div>
        </div>
      </li>

      <li>
        <div className="input-group date mb-3" id="datetimepicker8" data-target-input="nearest">
          <label htmlFor="datetimepicker8" className="pt-2 pr-2">終了日:</label>
          <div className="d-flex">
            <input type="text" data-input className="form-control" data-target="#datetimepicker8" style={{ background: 'white' }} />
            <span className="input-group-text" data-toggle>
              <span className="fa fa-calendar"></span>
            </span>
          </div>
        </div>
      </li>

      <li>
        <label className="pt-2 pr-2">開始時</label>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <div className="search_option_two" style={{ width: '47%' }}>
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 show-tick form-select"
                name="startHour"
                value={formData.startHour}
                onChange={handleInputChange}
              >
                <option value="">時</option>
                {
                  makeArray(24).map((item, index) => (
                    <option key={index} value={index}>
                      {
                        index < 10 ? '0' + index : index
                      }
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <span className="flex-1 text-center">:</span>
          <div className="search_option_two" style={{ width: '47%' }}>
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 show-tick form-select"
                name="startMinute"
                value={formData.startMinute}
                onChange={handleInputChange}
              >
                <option value="">分</option>
                {
                  makeArray(60).map((item, index) => (
                    <option key={index} value={index}>
                      {
                        index < 10 ? '0' + index : index
                      }
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </li>

      <li>
        <label className="pt-2 pr-2">終了時</label>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <div className="search_option_two" style={{ width: '47%' }}>
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 show-tick form-select"
                name="endHour"
                value={formData.endHour}
                onChange={handleInputChange}
              >
                <option value="">時</option>
                {
                  makeArray(24).map((item, index) => (
                    <option key={index} value={index}>
                      {
                        index < 10 ? '0' + index : index
                      }
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <span className="flex-1 text-center px-2">:</span>
          <div className="search_option_two" style={{ width: '47%' }}>
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 show-tick form-select"
                name="endMinute"
                value={formData.endMinute}
                onChange={handleInputChange}
              >
                <option value="">分</option>
                {
                  makeArray(60).map((item, index) => (
                    <option key={index} value={index}>
                      {
                        index < 10 ? '0' + index : index
                      }
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div id="accordion" className="panel-group">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  href="#panelBodyRating"
                  className="accordion-toggle link"
                  data-bs-toggle="collapse"
                  data-bs-parent="#accordion"
                >
                  <i className="flaticon-more"></i> Advanced features
                </a>
              </h4>
            </div>
            {/* End .panel-heading */}

            <div id="panelBodyRating" className="panel-collapse collapse">
              <div className="panel-body row">
                <div className="col-lg-12">
                  <ul className="ui_kit_checkbox selectable-list fn-400">
                    {
                      AllTags.map((item, index) => (
                        <li key={index}>
                          <div className="form-check custom-checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={item.key}
                              value={item.key}
                              checked={formData.tags.some(tag => tag === item.key)}
                              onChange={() => handleClickTagItem(item)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={item.key}
                            >
                              {item.name}
                            </label>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {/* End li */}

      <li>
        <div className="search_option_button">
          <button
            className="btn btn-thm reservation-btn"
            style={{ width: '100%' }}
            onClick={handleSearch}
          >
            検索
          </button>
        </div>
      </li>

      <li style={{
        marginTop: '10px'
      }}>
        <div className="search_option_button">
          <button
            type="button"
            className="btn btn-block btn-thm w-100"
            onClick={handleClearFilter}
          >
            クリア
          </button>
        </div>
      </li>
      {/* End li */}
    </ul>
  );
};

export default FilteringItem;

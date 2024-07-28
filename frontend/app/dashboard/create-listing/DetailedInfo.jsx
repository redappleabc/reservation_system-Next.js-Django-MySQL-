"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

import CheckBoxFilter from "../../../components/common/CheckBoxFilter";
import { frontendAxiosInstance } from "@/utils/http-common";

import { AllMainCategories, AllSubCategories } from "@/utils/configInfo";

const DetailedInfo = ({ service, setService }) => {
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: ""
  })

  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData({
      mainCategory: _.get(service.Category, 'main', ''),
      subCategory: _.get(service.Category, 'sub', '')
    })
    setTags(_.get(service, 'tags') || [])
  }, [service])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {

      const isValid = Object.values(formData).every(value => value) && tags.length > 0;

      if (!isValid) {
        setErrorMessage("情報を正確に選択してください。");
        return;
      }

      setErrorMessage("");

      let payload = {
        ...formData,
        tags
      }
      if (service) {
        payload = {
          ...payload,
          serviceId: service.uuid
        }
      }
      const res = await frontendAxiosInstance.post('service/detail-info', payload);

      setService(res.data.result.service);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="mainCategory">大カテゴリー</label>
          <select className="selectpicker w100 show-tick form-select" id="mainCategory" name="mainCategory"
            value={formData.mainCategory} onChange={handleInputChange}>
            <option value="">アイテムを選択してください</option>
            {
              AllMainCategories.map((item, index) => (
                <option key={index} value={item.key}>{item.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label htmlFor="subCategory">中カテゴリ</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
          >
            <option value="">アイテムを選択してください</option>
            {
              AllSubCategories.map((item, index) => (
                <option key={index} value={item.key}>{item.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="col-xl-12">
        <h4 className="mb10">タグ</h4>
      </div>
      <CheckBoxFilter tags={tags} setTags={setTags} />
      <p className="mt-2 text-danger" style={{ fontSize: '1rem' }}>{errorMessage}</p>
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;

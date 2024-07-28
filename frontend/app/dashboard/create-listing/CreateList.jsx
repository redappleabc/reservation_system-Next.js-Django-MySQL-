"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

import { frontendAxiosInstance } from "@/utils/http-common";
import service from "@/data/service";

const CreateList = ({ newService, setNewService }) => {

  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    type: 'school',
    min_level: 0,
  })
  const [errorTitle, setErrorTitle] = useState();
  const [isFocusTitleField, setIsFocusTitleField] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const validatorFormData = (type) => {
    switch (type) {
      case 'title':
        if (!formData[type].length) {
          setIsValidTitle(false);
          setErrorTitle("この項目は必須です。");
        } else {
          setIsValidTitle(true);
          setErrorTitle("");
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setFormData({
      title: _.get(newService, 'title', ''),
      overview: _.get(newService, 'overview', ''),
      type: _.get(newService, 'type', 'school'),
      min_level: Number(_.get(newService, 'min_level', '0')),
    })
  }, [newService])

  useEffect(() => {
    if (isValidTitle) {
      setIsValid(true);
    }
  }, [isValidTitle])

  useEffect(() => {
    Object.keys(formData).forEach(key => {
      validatorFormData(key);
    })
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    try {
      let payload = formData;
      if (newService) {
        payload = {
          serviceId: newService.uuid,
          ...formData
        }
      }
      const res = await frontendAxiosInstance.post('service/maindata', payload);
      const service = res.data.result.service;
      setNewService(service);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 d-flex flex-column">
          <div className="my_profile_setting_input form-group" style={{ margin: '5px' }}>
            <label htmlFor="title" className="d-flex flex-row gap-2">
              <span>タイトル</span>
              <span className="badge text-bg-danger text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>必要</span>
            </label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} placeholder="タイトルを記入してください"
              onChange={handleInputChange} onBlur={() => setIsFocusTitleField(true)} />
          </div>
          <p className="text-danger" style={{ fontSize: '14px', padding: '0 5px' }}>{!isValidTitle && isFocusTitleField && errorTitle}</p>
        </div>
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea">
            <label htmlFor="overview" className="d-flex flex-row gap-2">
              <span>説明文</span>
              <span className="badge text-bg-success text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>任意</span>
            </label>
            <textarea
              className="form-control"
              id="overview"
              name="overview"
              rows="7"
              placeholder="説明文を記入してください"
              value={formData.overview}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="type" className="d-flex flex-row gap-2">
              <span>サービスタイプ</span>
              <span className="badge text-bg-danger text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>必要</span>
            </label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="school" data-tokens="Type1">オンラインスクール</option>
              <option value="lodging" data-tokens="Type2">民泊</option>
              <option value="part-time-job" data-tokens="Type3">アルバイト</option>
            </select>
          </div>
        </div>
        {/* <div className="col-lg-4 col-xl-4">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>ステータス</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
            >
              <option data-tokens="Status1">下書き</option>
              <option data-tokens="Status2">審査中</option>
              <option data-tokens="Status3">公開済み</option>
              <option data-tokens="Status3">終了</option>
            </select>
          </div>
        </div> */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="min_level" className="d-flex flex-row gap-2">
              <span>ユーザーレベル</span>
              <span className="badge text-bg-success text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>任意</span>
            </label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              name="min_level"
              value={formData.min_level}
              onChange={handleInputChange}
            >
              <option value={0}>制限なし</option>
              {[...Array(100)].map((_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1} レベル</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn btn1 float-start">Back</button>
            <button className="btn btn2 float-end" onClick={handleSubmit}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateList;

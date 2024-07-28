"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

import OptionItem from "./OptionItem";
import { frontendAxiosInstance } from "@/utils/http-common";

const Option = ({ service, setService }) => {

  const initialData = {
    optionName: "",
    pointNumber: "",
    optionContent: ""
  }

  const [optionItems, setOptionItems] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [pointNumberMessage, setPointNumberMessage] = useState("");

  useEffect(() => {
    setOptionItems(_.get(service, 'Options') || []);
  }, [service])

  const validatorName = (name) => {
    if (name.length === 0) {
      setNameErrorMessage("この項目は必須です。");
      return false;
    }
    setNameErrorMessage("");
    return true;
  }

  const validatorPointNumber = (pointNumber) => {
    if (pointNumber === -1) {
      setPointNumberMessage("この項目は必須です。");
      return false;
    }
    setPointNumberMessage("");
    return true;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleAddOptionItem = async () => {
    try {
      const isValid = Object.entries(formData).every(([key, value]) => {
        let isValid;
        switch (key) {
          case "pointNumber":
            isValid = validatorPointNumber(value);
            break;
          case "optionName":
            isValid = validatorName(value);
            break;
          default:
            isValid = true;
            break;
        }
        return isValid;
      })

      if (!isValid) return;

      let payload = formData;
      if (service) {
        payload = {
          ...formData,
          serviceId: service?.uuid
        }
      }

      const res = await frontendAxiosInstance.post('service/option', payload);

      const updatedService = res.data.result.service;
      setService(updatedService);
      setOptionItems(updatedService.Options);
      setFormData(initialData);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleDeleteOptionItem = async (id) => {
    try {
      const res = await frontendAxiosInstance.delete(`service/option/${id}`);
      const deletedId = res.data.result.deletedId;

      const index = optionItems.findIndex(item => item.id === Number(deletedId));
      if (index >= 0) {
        const prevOptions = [...optionItems];
        prevOptions.splice(index, 1);
        setOptionItems(prevOptions);
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleSaveOptionUpdate = async (option) => {
    try {
      const payload = {
        optionName: option.optionName,
        pointNumber: option.pointNumber,
        optionContent: option.optionContent,
      }

      const res = await frontendAxiosInstance.put(`service/option/${option.id}`, payload);
      const updatedOption = res.data.result.option;
      const index = optionItems.findIndex(item => item.id === Number(updatedOption.id));
      if (index >= 0) {
        const prevOptions = [...optionItems];
        prevOptions[index] = updatedOption;
        setOptionItems(prevOptions);
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }
  return (
    <div className="home_adv_srch_opt dateTimeReservation">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-self-tab"
            data-bs-toggle="pill"
            href="#pills-self"
            role="tab"
            aria-controls="pills-self"
            aria-selected="true"
          >
            自分で決める
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-template-tab"
            data-bs-toggle="pill"
            href="#pills-template"
            role="tab"
            aria-controls="pills-template"
            aria-selected="false"
          >
            テンプレート
          </a>
        </li>
      </ul>
      <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
        <div
          className="tab-pane fade show active w-100"
          id="pills-self"
          role="tabpanel"
          aria-labelledby="pills-self-tab"
        >
          <div className="py-4">
            {optionItems.map((item, index) => (
              <OptionItem key={index} optionItem={item} onDelete={handleDeleteOptionItem} onSave={handleSaveOptionUpdate}></OptionItem>
            ))}
          </div>

          <div className="row d-flex mb-3">
            <div className="col-lg-7 col-xl-7">
              <div className="form-group d-flex flex-column gap-2">
                <label htmlFor="optionName" className="d-flex flex-row gap-2">
                  <span>オプション名</span>
                  <span className="badge text-bg-danger text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>必要</span>
                </label>
                <input type="text" className="form-control" id="optionName" placeholder="オプション名を入力してください。"
                  name="optionName" value={formData.optionName} onChange={handleInputChange} />
              </div>
              {
                nameErrorMessage && (
                  <div className="mt-3">
                    <p className="text-danger px-2" style={{ fontSize: '12px' }}>{nameErrorMessage}</p>
                  </div>
                )
              }
            </div>

            <div className="col-lg-5 col-xl-5">
              <div className="form-group d-flex flex-column gap-2">
                <label htmlFor="optionName" className="d-flex flex-row gap-2">
                  <span>ポイント数</span>
                  <span className="badge text-bg-danger text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>必要</span>
                </label>
                <input type="number" min={0} className="form-control" id="pointNumber" placeholder="無料の場合は0を入力してください."
                  name="pointNumber" value={formData.pointNumber} onChange={handleInputChange} />
              </div>
              {
                pointNumberMessage && (
                  <div className="mt-3">
                    <p className="text-danger px-2" style={{ fontSize: '12px' }}>{pointNumberMessage}</p>
                  </div>
                )
              }
            </div>

            <div className="col-12 mt-3">
              <div className="form-group d-flex flex-column gap-2">
                <label htmlFor="optionContent" className="d-flex flex-row gap-2">
                  <span>オプション説明文</span>
                  <span className="badge text-bg-success text-wrap text-center align-content-center" style={{ fontSize: '10px' }}>任意</span>
                </label>
                <textarea className="form-control" id="optionContent" rows={5} placeholder="オプションの内容を入力してください。"
                  name="optionContent" value={formData.optionContent} onChange={handleInputChange} ></textarea>
              </div>
            </div>
          </div>

          <div className="d-flex align-item-center justify-content-end">
            <button
              className="btn btn-secondary mt-3 w-25"
              onClick={handleAddOptionItem}
            >
              Add
            </button>
          </div>

        </div>
        <div
          className="tab-pane fade show w-100"
          id="pills-template"
          role="tabpanel"
          aria-labelledby="pills-template-tab"
        >
          <div className="d-flex align-item-center justify-content-end">
            <button
              className="btn btn-secondary mt-3 w-25"
              onClick={handleAddOptionItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;

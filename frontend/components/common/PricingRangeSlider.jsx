'use client'

import { useEffect } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";

const RangeSlider = ({ formData, setFormData }) => {

  const handleOnChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      min_point: value.min,
      max_point: value.max
    }))
  };

  // price add to state

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-between">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>{formData.min_point}</span>
            <span>PT </span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>{formData.max_point}</span>
            <span>PT </span>
          </div>
        </div>
      </div>

      <InputRange
        formatLabel={(value) => ``}
        maxValue={20000}
        minValue={100}
        value={{
          min: formData.min_point,
          max: formData.max_point,
        }}
        onChange={(value) => handleOnChange(value)}
      />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;

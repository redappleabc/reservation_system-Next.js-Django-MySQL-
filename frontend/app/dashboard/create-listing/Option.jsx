"use client";

import React from "react";
import { useState } from "react";
import OptionItem from "./OptionItem";

const Option = () => {
  const [optionItems, setOptionItems] = useState([
    {
      id: 0,
      component: (
        <OptionItem key={0} id={0} onDelete={() => handleDeleteOptionItem(0)} />
      ),
    },
  ]);

  const handleAddOptionItem = () => {
    const newIndex = optionItems.length;
    setOptionItems([
      ...optionItems,
      {
        id: newIndex,
        component: (
          <OptionItem
            key={newIndex}
            id={newIndex}
            onDelete={() => handleDeleteOptionItem(newIndex)}
          />
        ),
      },
    ]);
  };

  const handleDeleteOptionItem = (id) => {
    const newOptionItems = optionItems.filter((item) => item.id !== id);
    setOptionItems(newOptionItems);
  };
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
          <div className="d-flex align-item-center justify-content-end">
            <button
              className="btn btn-secondary mb-3 w-25"
              onClick={handleAddOptionItem}
            >
              Add
            </button>
          </div>
          {optionItems.map((item) => (
            <div key={item.id}>{item.component}</div>
          ))}
        </div>
        <div
          className="tab-pane fade w-100"
          id="pills-template"
          role="tabpanel"
          aria-labelledby="pills-template-tab"
        >
          <div className="d-flex align-item-center justify-content-end">
            <button
              className="btn btn-secondary mb-3 w-25"
              onClick={handleAddOptionItem}
            >
              Add
            </button>
          </div>
          {optionItems.map((item) => (
            <div key={item.id}>{item.component}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Option;

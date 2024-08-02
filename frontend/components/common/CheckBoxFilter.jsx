"use client";

import { useState, useEffect } from "react";

import { AllTags } from "@/utils/configInfo";

const CheckBoxFilter = ({ tags = [], setTags = () => { return; } }) => {

  const [selectedTags, setSelectedTags] = useState(tags);

  const handleCheckChange = (e) => {
    const checked = e.target.checked;
    const key = e.target.value;

    if (!checked) {
      const prevTags = [...tags];
      const index = tags.findIndex(item => item === key);
      prevTags.splice(index, 1);
      setTags(prevTags);
    } else {
      setTags([...tags, key]);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <ul className="ui_kit_checkbox selectable-list row">
          {
            AllTags.map((tag, index) => (
              <li key={index} className="col-md-2 col-sm-4 col-6">
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`tag-${index + 1}`}
                    checked={tags.some(item => item === tag.key)}
                    value={tag.key}
                    onChange={handleCheckChange}
                  />
                  <label className="form-check-label" htmlFor="customCheck1">
                    {tag.name}
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default CheckBoxFilter;

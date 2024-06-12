'use client'

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStatusType } from "../../../features/filter/filterSlice";
import {
  addAmenities,
  addBathrooms,
  addBedrooms,
  addStatus,
  addYearBuilt,
  resetAmenities,
} from "../../../features/properties/propertiesSlice";
import { v4 as uuidv4 } from "uuid";


const FilteringItem2 = () => {
  const { status, bathrooms, bedrooms, yearBuilt } = useSelector(
    (state) => state.properties
  );

  // input state
  const [getStatus, setStatus] = useState(status);
  const [getBathroom, setBathroom] = useState(bathrooms);
  const [getBedroom, setBedroom] = useState(bedrooms);
  const [getBuiltYear, setBuiltYear] = useState(yearBuilt);

  // advanced state
  const [getAdvanced, setAdvanced] = useState([
    { id: uuidv4(), name: "Air Conditioning" },
    { id: uuidv4(), name: "Barbeque" },
    { id: uuidv4(), name: "Gym" },
    { id: uuidv4(), name: "Microwave" },
    { id: uuidv4(), name: "TV Cable" },
    { id: uuidv4(), name: "Lawn" },
    { id: uuidv4(), name: "Refrigerator" },
    { id: uuidv4(), name: "Swimming Pool" },
    { id: uuidv4(), name: "WiFi" },
    { id: uuidv4(), name: "Sauna" },
    { id: uuidv4(), name: "Dryer" },
    { id: uuidv4(), name: "Washer" },
    { id: uuidv4(), name: "Laundry" },
    { id: uuidv4(), name: "Outdoor Shower" },
    { id: uuidv4(), name: "Window Coverings" },
  ]);

  const dispath = useDispatch();



  // status
  useEffect(() => {
    dispath(addStatus(getStatus));
  }, [dispath, getStatus]);

  // bathroom
  useEffect(() => {
    dispath(addBathrooms(getBathroom));
  }, [dispath, getBathroom]);

  // bedroom
  useEffect(() => {
    dispath(addBedrooms(getBedroom));
  }, [dispath, getBedroom]);

  // built years
  useEffect(() => {
    dispath(addYearBuilt(getBuiltYear));
  }, [dispath, getBuiltYear]);

  // clear filter
  const clearHandler = () => {
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setStatus("");
    setBathroom("");
    setBedroom("");
    setBuiltYear("");
    dispath(resetAmenities());
    dispath(addStatusType(""));
    clearAdvanced();
  };

  // clear advanced
  const clearAdvanced = () => {
    const changed = getAdvanced.map((item) => {
      item.isChecked = false;
      return item;
    });
    setAdvanced(changed);
  };

  // add advanced
  const advancedHandler = (id) => {
    const data = getAdvanced.map((feature) => {
      if (feature.id === id) {
        if (feature.isChecked) {
          feature.isChecked = false;
        } else {
          feature.isChecked = true;
        }
      }
      return feature;
    });

    setAdvanced(data);
  };

  return (
    <>
      <ul className="sasw_list mb0 ">
        <li>
          <div className="panel-body row">
            <div className="col-lg-12">
              <ul className="ui_kit_checkbox selectable-list ui_kit_2 fn-400">
                {getAdvanced?.map((feature) => (
                  <li key={feature.id}>
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={feature.id}
                        value={feature.name}
                        checked={feature.isChecked || false}
                        onChange={(e) => dispath(addAmenities(e.target.value))}
                        onClick={() => advancedHandler(feature.id)}
                      />
                      <label className="form-check-label" htmlFor={feature.id}>
                        {feature.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        {/* End li */}
      </ul>

      <ul className="botoom-filter apeartment_area_list style-2">
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getStatus}
              >
                <option value="">Status</option>
                <option value="apartment">Apartment</option>
                <option value="bungalow">Bungalow</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="single family">Single Family</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBathroom(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBathroom}
              >
                <option value="">Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBedroom(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBedroom}
              >
                <option value="">Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBuiltYear(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBuiltYear}
              >
                <option value="">Year built</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}
      </ul>

      <li className="w-100">
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Clear Filters
          </button>
        </div>
      </li>
      {/* End li */}
    </>
  );
};

export default FilteringItem2;

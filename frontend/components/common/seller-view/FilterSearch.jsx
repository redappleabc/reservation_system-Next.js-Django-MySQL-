'use client'

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addCity,
  addListen,
  addName,
} from "../../../features/agent/agentSlice";

const FilterSearch = () => {
  const { name, category, city } = useSelector((state) => state.agent) || {};

  const [getName, setName] = useState(name);
  const [getCategory, setCategory] = useState(category);
  const [getCity, setCity] = useState(city);
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();

  // name
  useEffect(() => {
    dispatch(addName(getName));
  }, [dispatch, getName]);

  // category
  useEffect(() => {
    dispatch(addCategory(getCategory));
  }, [dispatch, getCategory]);

  // city
  useEffect(() => {
    dispatch(addCity(getCity));
  }, [dispatch, getCity]);

  const clearHandler = () => {
    setName("");
    setCategory("");
    setCity("");
    dispatch(addListen(""));
  };

  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="お名前を入力してください。"
            onChange={(e) => setName(e.target.value)}
            value={getName}
          />
        </div>
      </li>
      {/* End .search_area */}

      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="selectpicker w100 show-tick form-select"
            >
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
              <option>カテゴリー</option>
            </select>
          </div>
        </div>
      </li>
      {/* End Categories search_area */}

      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCity(e.target.value)}
              className="selectpicker w100 show-tick form-select"
            >
              <option>週間</option>
              <option>月間</option>
              <option>年間</option>
            </select>
          </div>
        </div>
      </li>
      {/* End City search_area */}

      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            クリア
          </button>
        </div>
      </li>
      {/* End submit serch button */}
    </ul>
  );
};

export default FilterSearch;

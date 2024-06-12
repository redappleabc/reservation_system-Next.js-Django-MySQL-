'use client'

import { useDispatch, useSelector } from "react-redux";
import { toggleGridAndList } from "../../../features/filter/filterSlice";

const GridListButton = () => {
  const { isGridOrList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <ul className="mb-3">
      <li
        className={`list-inline-item ${!isGridOrList ? "active" : ""}`}
        onClick={() => dispatch(toggleGridAndList(false))}
      >
        <a>
          <span className="fa fa-th-large"></span>
        </a>
      </li>
      {/* End li */}

      <li
        className={`list-inline-item ${isGridOrList ? "active" : ""}`}
        onClick={() => dispatch(toggleGridAndList(true))}
      >
        <a>
          <span className="fa fa-th-list"></span>
        </a>
      </li>
      {/* End li */}
    </ul>
  );
};

export default GridListButton;

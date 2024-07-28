'use client'

const GridListButton = ({ isGridOrList, setIsGridOrList }) => {

  return (
    <ul className="mb-3">
      <li
        className={`list-inline-item ${!isGridOrList ? "active" : ""}`}
        onClick={() => setIsGridOrList(false)}
      >
        <a>
          <span className="fa fa-th-large"></span>
        </a>
      </li>
      {/* End li */}

      <li
        className={`list-inline-item ${isGridOrList ? "active" : ""}`}
        onClick={() => setIsGridOrList(true)}
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

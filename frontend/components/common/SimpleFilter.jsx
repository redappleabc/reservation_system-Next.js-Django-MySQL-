'use client'

import { useRouter } from "next/navigation";


const SimpleFilter = () => {
    const router = useRouter()
  return (
    <ul className="h1ads_1st_list mb0 text-center">
      <li className="list-inline-item">
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select className="selectpicker w100 form-select show-tick ">
              <option>All Cities</option>
              <option>Apartment</option>
              <option>Bungalow</option>
              <option>Condo</option>
              <option>House</option>
              <option>Land</option>
              <option>Single Family</option>
            </select>
          </div>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter keyword..."
          />
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="search_option_button">
          <button
            onClick={() => router.push("/listing-list-v1")}
            type="submit"
            className="btn btn-thm"
          >
            Search
          </button>
        </div>
      </li>
      {/* End li */}
    </ul>
  );
};

export default SimpleFilter;

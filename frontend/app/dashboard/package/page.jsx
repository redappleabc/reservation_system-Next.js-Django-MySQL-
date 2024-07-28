import DashboardNavigation from "../DashboardNavigation";
import PackageData from "./PackageData";
import SearchBox from "./SearchBox";

const Package = () => {
  return (
    <div className="row">
      <div className="row align-items-center">
        <div className="col-md-8 col-lg-8 col-xl-9 mb20">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">My Package</h2>
            <p>We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3 mb20">
          <ul className="sasw_list mb0">
            <li className="search_area">
              <SearchBox />
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            <div className="col-lg-12">
              <div className="packages_table">
                <div className="table-responsive mt0">
                  <PackageData />
                </div>
              </div>
              <div className="pck_chng_btn text-end">
                <button className="btn btn-lg btn-thm">
                  Change Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt50">
        <div className="col-lg-12">
          <div className="copyright-widget text-center">
            <p>Copyright &copy; 2024 CO.LTD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;

import SearchData from "./SearchData";
import SearchBox from "./SearchBox";
import DashboardNavigation from "../DashboardNavigation";

const SavedSearch = () => {
  return (
    <>
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
               <DashboardNavigation/>
              </div>
              <div className="row align-items-center">
                <div className="col-md-8 col-lg-8 col-xl-9 mb20">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">My Saved Search</h2>
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
                      <div className="savesearched_table">
                        <div className="table-responsive mt0">
                          <SearchData />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedSearch;

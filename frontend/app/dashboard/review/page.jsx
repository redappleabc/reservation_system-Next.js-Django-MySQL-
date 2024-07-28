import DashboardNavigation from "../DashboardNavigation";
import AuthorReview from "./AuthorReview";
import ClientReview from "./ClientReview";
import SearchBox from "./SearchBox";

const Review = () => {
  return (
    <div className="row">
      <div className="row align-items-center">
        <div className="col-lg-8 col-xl-9 mb20">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">My Reviews</h2>
            <p>We are glad to see you again!</p>
          </div>
        </div>
        <div className="col-lg-4 col-xl-3 mb20">
          <ul className="sasw_list mb0">
            <li className="search_area">
              <SearchBox />
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div id="myreview" className="my_dashboard_review">
            <div className="review_content">
              <h4>My Reviews</h4>
              <AuthorReview />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div
            id="client_myreview"
            className="my_dashboard_review mt30"
          >
            <div className="review_content client-review">
              <h4>Visitor Reviews</h4>
              <ClientReview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

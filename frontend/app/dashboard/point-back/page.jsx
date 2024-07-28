import Point from "./Point";
import DashboardNavigation from "../DashboardNavigation";

const Membership = () => {
  return (
    <div className="row">
      <div className="row align-items-center">
        <div className="col-lg-8 col-xl-9 mb20">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">Please convert from PT to Yen!</h2>
            <p>We provide full service at every step</p>
          </div>
        </div>
      </div>
      <div className="row">
        <Point />
      </div>
    </div>
  );
};

export default Membership;

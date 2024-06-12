import Pricing from "./Pricing";
import DashboardNavigation from "../DashboardNavigation";

const Membership = () => {
  return (
    <>
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <DashboardNavigation />
              </div>
              <div className="row align-items-center">
                <div className="col-lg-8 col-xl-9 mb20">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Choose Your Perfect Plan From Us</h2>
                    <p>We provide full service at every step</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <Pricing />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Membership;

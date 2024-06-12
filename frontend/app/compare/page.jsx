import CallToAction from "@/components/common/CallToAction";
import BreadCrumbBanner from "./BreadCrumbBanner";
import ComparePricing from "./ComparePricing";

const Compare = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="our-pricing bgc-fa">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Compare Listings</h2>
                <p>We provide full service at every step</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="membership_container">
                <ul className="mc_parent_list">
                  <li className="list-inline-item">
                    <ul className="mc_child_list one">
                      <li>
                        <div className="membership_header dn"></div>
                      </li>
                      <li>City</li>
                      <li>Beds</li>
                      <li>Rooms</li>
                      <li>Garage</li>
                      <li>Year of build</li>
                      <li>Laundry Room</li>
                      <li>Status</li>
                    </ul>
                  </li>
                  <ComparePricing />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>
    </>
  );
};

export default Compare;

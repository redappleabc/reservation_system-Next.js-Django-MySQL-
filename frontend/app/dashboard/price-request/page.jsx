import DashboardNavigation from "../DashboardNavigation";
import RequestForm from "./requestForm";

const PriceRequest = () => {
  return (
    <>
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <DashboardNavigation/>
                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">振込申請</h2>
                    <p>銀行口座を登録してください。</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="favorite_item_list">
                      <RequestForm/>
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

export default PriceRequest;

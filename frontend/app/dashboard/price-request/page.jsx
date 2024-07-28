import DashboardNavigation from "../DashboardNavigation";
import RequestForm from "./requestForm";

const PriceRequest = () => {
  return (
    <div className="row">
      <div className="col-lg-4 col-xl-4 mb10">
        <div className="breadcrumb_content style2 mb30-991">
          <h2 className="breadcrumb_title">振込申請</h2>
          <p>銀行口座を登録してください。</p>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_dashboard_review mb40">
          <div className="favorite_item_list">
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRequest;

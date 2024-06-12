import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import DateTimeReservation from "./DateTimeReservation";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import Option from "./Option";
import DashboardNavigation from "../DashboardNavigation";

const CreateListing = () => {
  return (
    <>
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <DashboardNavigation/>
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">サービス登録</h2>
                    <p>Add new service!</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">サービス登録</h3>
                      </div>
                      <CreateList />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">場所</h3>
                      </div>
                      <LocationField />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">詳細情報</h3>
                    </div>
                    <DetailedInfo />
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">画像のアップロード</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div>
                  <div className="my_dashboard_review mt30 dateTimeLayout">
                    <div className="col-lg-12">
                      <h3 className="mb30">利用期間</h3>
                    </div>
                    <DateTimeReservation />
                  </div>
                  <div className="my_dashboard_review mt30 dateTimeLayout">
                    <div className="col-lg-12">
                      <h3 className="mb30">オプション</h3>
                    </div>
                    <Option />
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

export default CreateListing;

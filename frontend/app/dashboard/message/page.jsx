import DashboardNavigation from "../DashboardNavigation";
import ChatBox from "./ChatBox";

const Message = () => {
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
                    <h2 className="breadcrumb_title">メッセージ</h2>
                    <p>Message</p>
                  </div>
                </div>
              </div>
              <ChatBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Message;

import DashboardNavigation from "../DashboardNavigation";
import ChatBox from "./ChatBox";

const Message = () => {
  return (
    <div className="row">
      <div className="col-lg-12 mb10">
        <div className="breadcrumb_content style2">
          <h2 className="breadcrumb_title">メッセージ</h2>
          <p>Message</p>
        </div>
      </div>
      <ChatBox />
    </div>
  );
};

export default Message;

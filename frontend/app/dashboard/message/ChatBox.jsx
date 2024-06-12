import ChatboxContent from "./ChatboxContent";
import InboxUser from "./InboxUser";

const ChatBox = () => {
  return (
    <div className="row">
      <div className="col-lg-5 col-xl-4">
        <div className="message_container">
          <InboxUser />
        </div>
      </div>
      <div className="col-lg-7 col-xl-8">
        <div className="message_container">
          <ChatboxContent />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

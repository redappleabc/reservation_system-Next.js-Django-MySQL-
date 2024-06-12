import SignleChatboxReply from "./SignleChatboxReply";

const ChatboxContent = () => {
  return (
    <>
      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          <SignleChatboxReply />
        </ul>
      </div>
      {/* End inbox_chatting_box */}

      <div className="mi_text">
        <div className="message_input">
          <form className="form-inline position-relative">
            <textarea
              className="form-control"
              placeholder="メッセージを入力してください"
              cols="20"
              rows="1"
              wrap="hard"
              required
            />
            <button className="btn" type="submit">
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatboxContent;

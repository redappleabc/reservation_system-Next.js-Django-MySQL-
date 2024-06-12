const ContactWithAgent = () => {
  return (
    <form action="#">
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="名前"
              required
            />
          </div>
        </li>
        <li className="search_area">
          <div className="form-group mb-3">
            <textarea
              id="form_message"
              name="form_message"
              className="form-control "
              rows="5"
              required
              placeholder="メッセージ"
            ></textarea>
          </div>
        </li>{" "}
        <li>
          <div className="search_option_button">
            <button type="submit" className="btn btn-block btn-thm w-100">
            送信
            </button>
          </div>
        </li>{" "}
      </ul>
    </form>
  );
};

export default ContactWithAgent;

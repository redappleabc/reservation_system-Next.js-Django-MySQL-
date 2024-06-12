import Social from "../../components/common/footer/Social";

const AddressSidebar = () => {
  return (
    <div className="contact_localtion">
      <h4>Lapaz Reservation System</h4>
      <p>
        テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
      </p>
      <div className="content_list">
        <h5>住所</h5>
        <p>
          東京都 目黒区 鷹番 3-8-4-301
        </p>
      </div>
      <div className="content_list">
        <h5>電話番号</h5>
        <p>080-5858-0044</p>
      </div>
      <div className="content_list">
        <h5>メールアドレス</h5>
        <p>venus.seniordev@gmail.com</p>
      </div>
      <div className="content_list">
        <h5>Skype</h5>
        <p>メールアドレス</p>
      </div>
      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <Social />
      </ul>
    </div>
  );
};

export default AddressSidebar;

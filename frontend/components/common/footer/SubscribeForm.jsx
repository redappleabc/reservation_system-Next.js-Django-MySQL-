'use client'

const SubscribeForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="footer_mailchimp_form" onClick={handleSubmit}>
      <div className="d-flex align-items-center">
        <div className="col-auto">
          <input
            type="email"
            className="form-control mb-2"
            id="inlineFormInput"
            placeholder="メールアドレス"
          />
        </div>

        <div className="col-auto ms-2">
          <button type="submit" className="btn btn-primary mb-2">
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;

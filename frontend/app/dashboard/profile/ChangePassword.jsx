const ChangePassword = () => {
  return (
    <>
      <div className="row">
        <div className="col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleOldPass">現在のパスワード</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleOldPass"
              placeholder="alitfn"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleNewPass">パスワード</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleNewPass"
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleConfPass">
            パスワード（確認）
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleConfPass"
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_input float-end fn-520">
            <button className="btn btn2">保存する</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

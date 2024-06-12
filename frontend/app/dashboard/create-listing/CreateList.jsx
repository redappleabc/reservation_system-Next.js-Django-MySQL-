const CreateList = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">タイトル</label>
          <input type="text" className="form-control" id="propertyTitle" placeholder="タイトルを記入してください"/>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">説明文</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            placeholder="説明文を記入してください"
          ></textarea>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>サービスタイプ</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="type1">オンラインスクール</option>
            <option data-tokens="Type2">民泊</option>
            <option data-tokens="Type3">アルバイト</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>ステータス</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Status1">公開済み</option>
            <option data-tokens="Status2">レビュー待ち</option>
            <option data-tokens="Status3">下書き</option>
          </select>
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">価格</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
          />
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">個数</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleArea"
          />
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>ユーザーレベル</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option value="">制限なし</option>
            {[...Array(100)].map((_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1} レベル</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div>
    </>
  );
};

export default CreateList;

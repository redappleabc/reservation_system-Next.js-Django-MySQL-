import CheckBoxFilter from "../../../components/common/CheckBoxFilter";

const DetailedInfo = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyPrefecture">大カテゴリー</label>
          <select className="selectpicker w100 show-tick form-select" id="propertyPrefecture">
            <option>英語</option>
            <option>中国語</option>
            <option>スペイン語</option>
            <option>大カテゴリー</option>
            <option>大カテゴリー</option>
            <option>大カテゴリー</option>
            <option>大カテゴリー</option>
            <option>大カテゴリー</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>中カテゴリ</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option>TOEIC対策コース</option>
            <option>学生向けグループコース</option>
            <option>中カテゴリ</option>
            <option>中カテゴリ</option>
            <option>中カテゴリ</option>
            <option>中カテゴリ</option>
            <option>中カテゴリ</option>
            <option>中カテゴリ</option>
          </select>
        </div>
      </div>

      <div className="col-xl-12">
        <h4 className="mb10">タグ</h4>
      </div>
      <CheckBoxFilter />
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;

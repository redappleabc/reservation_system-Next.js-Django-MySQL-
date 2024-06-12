const GlobalSelectBox = () => {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>大カテゴリー</option>
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
      <div className="col-sm-6">
        <div className="candidate_revew_select">
          <select className="selectpicker w100 show-tick form-select">
            <option>中カテゴリ</option>
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
    </div>
  );
};

export default GlobalSelectBox;

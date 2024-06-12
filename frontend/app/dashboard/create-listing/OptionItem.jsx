const OptionItem = ({ id, onDelete }) => {
    return (
      <div className="row d-flex align-items-center mb-2">
        <div className="col-lg-7 col-xl-7">
          <div className="form-group">
            <input type="text" className="form-control" id={`optionName-${id}`} placeholder="オプション名" />
          </div>
        </div>
        <div className="col-lg-4 col-xl-4">
          <div className="form-group d-flex align-items-center gap-2">
            <input type="text" className="form-control" id={`pointNumber-${id}`} placeholder="ポイント数" />
            <label htmlFor={`pointNumber-${id}`}>PT</label>
          </div>
        </div>
        <div className="col-lg-1 col-xl-1 cursor-pointer" onClick={onDelete}>
            <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
        </div>
      </div>
    );
  };
  
  export default OptionItem;
  
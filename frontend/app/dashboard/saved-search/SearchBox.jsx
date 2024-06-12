const SearchBox = () => {
  return (
    <form className="form-group">
      <input
        type="text"
        className="form-control"
        id="exampleInputName1"
        placeholder="Search"
      />
      <label htmlFor="exampleInputEmail">
        <span className="flaticon-magnifying-glass"></span>
      </label>
    </form>
  );
};

export default SearchBox;

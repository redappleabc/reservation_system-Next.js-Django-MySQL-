'use client'

const SearchBox = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onClick={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search Here"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          required
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <span className="flaticon-magnifying-glass"></span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;

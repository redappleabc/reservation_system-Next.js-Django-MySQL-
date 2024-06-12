const ReviewBox = () => {
  return (
    <form className="comments_form">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="レビュータイトル"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder="レビューを入力してください。"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-thm">
        送信
      </button>
    </form>
  );
};

export default ReviewBox;

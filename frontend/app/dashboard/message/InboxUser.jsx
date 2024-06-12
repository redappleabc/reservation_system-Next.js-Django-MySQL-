import SearchUser from "./SearchUser";
import SingleUser from "./SingleUser";

const InboxUser = () => {
  return (
    <div className="inbox_user_list">
      <div className="iu_heading">
        <div className="candidate_revew_search_box">
          <SearchUser />
        </div>
      </div>
      <ul>
        <SingleUser />
      </ul>
    </div>
  );
};

export default InboxUser;

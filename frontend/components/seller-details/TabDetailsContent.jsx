import Team from "../seller-view/Team";
import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";
import DescriptionsText from "./DescriptionsText";
import Listings from "./Listings";

const TabDetailsContent = () => {
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#description"
            role="tab"
            aria-controls="description"
            aria-selected="true"
          >
            説明文
          </a>
        </li>
        {/* End Description tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#listing"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            サービス一覧
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#review"
            role="tab"
            aria-controls="review"
            aria-selected="false"
          >
            レビュー
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body agent-desc">
                  <DescriptionsText />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="listing"
          role="tabpanel"
        >
          <Listings />
        </div>

        <div className="tab-pane fade" id="review" role="tabpanel">
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="total_review">
                <h4>896 レビュー</h4>
                <ul className="review_star_list mb0 pl10">
                  <Ratings />
                </ul>
                <a className="tr_outoff pl10" href="#">
                  ( 4.5 out of 5 )
                </a>
                <a className="write_review float-end fn-xsd" href="#">
                  レビューを書く
                </a>
              </div>
              <Comments />
              <div className="custom_hr"></div>

              <div className="mbp_comment_form style2">
                <h4>レビューを書く</h4>
                <ul className="review_star">
                  <li className="list-inline-item">
                    <span className="sspd_review">
                      <ul>
                        <Ratings />
                      </ul>
                    </span>
                  </li>
                  <li className="list-inline-item pr15">
                    <p>評価とレビュー</p>
                  </li>
                </ul>
                <ReviewBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabDetailsContent;

import ContactWithAgent from "../common/seller-view/ContactWithAgent";
import Categorie from "../common/listing/Categorie";
import FeaturedListings from "../common/listing/FeaturedListings";
import FeatureProperties from "../common/listing/FeatureProperties";

const SidebarListings = () => {
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">コンタクト申請</h4>
          <ContactWithAgent />
        </div>
      </div>
    </div>
  );
};

export default SidebarListings;

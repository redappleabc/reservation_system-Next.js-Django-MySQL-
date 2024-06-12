import Pagination from "@/components/common/blog/Pagination";
import FilterTopBar from "@/components/common/listing/FilterTopBar";
import GridListButton from "@/components/common/listing/GridListButton";
import ShowFilter from "@/components/common/listing/ShowFilter";
import SidebarListing from "@/components/common/listing/SidebarListing";
import BreadCrumb2 from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";

const Listings = () => {
  return (
    <>
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb2 />
            </div>
            <div className="col-lg-6 position-relative">
              <div className="listing_list_style mb20-xsd tal-991">
                <GridListButton />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListing />
              </div>
              <div
                className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                tabIndex="-1"
                id="sidebarListing"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title">詳細検索</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <SidebarListing />
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result ">
                <div className="row align-items-center">
                  <FilterTopBar />
                </div>
              </div>
              <div className="row">
                <FeaturedItem />
              </div>
              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listings;
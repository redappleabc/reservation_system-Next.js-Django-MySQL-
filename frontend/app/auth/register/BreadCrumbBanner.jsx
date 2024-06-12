import BreadCrumb from "@/components/common/BreadCrumb";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="新規登録" />
              <h4 className="breadcrumb_title">新規登録</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;

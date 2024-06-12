import BreadCrumbBanner from "./BreadCrumbBanner";
import FaqContent from "./FaqContent";

const Faq = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="our-faq bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="faq_content">
                <div className="faq_according">
                  <FaqContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;

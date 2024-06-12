import CallToAction from "@/components/common/CallToAction";
import BreadCrumbBanner from "./BreadCrumbBanner";
import TermsCondions from "./TermsCondions";

const TermConditions = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="our-terms bgc-f7">
        <div className="container">
          <TermsCondions />
        </div>
      </section>
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>
    </>
  );
};

export default TermConditions;

import Image from "next/image";
import CallToAction from "@/components/common/CallToAction";
import AddressSidebar from "./AddressSidebar";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";

const Contact = () => {
  return (
    <>
      <BreadCrumbBanner />
      <section className="our-contact pb0 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <div className="form_grid">
                <h4 className="mb5">下記のお問い合わせフォームよりお問い合わせください。</h4>
                <p>
                  Lapazにご興味を持っていただきありがとうございます。<br />
                  ご質問、お見積もり、採用エントリーの方など、すべてこちらのフォームからまずはお問い合わせください。
                </p>
                <Form />
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <AddressSidebar />
            </div>
          </div>
        </div>
        <div className="container-fluid p0 mt50">
          <div className="row">
            <div className="col-lg-12">
              <div className="h600" id="map-canvas">
                <div className="gmap_canvas pe-none">
                  <iframe
                    title="map"
                    className="gmap_iframe"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193309.02147838814!2d-74.53513266718751!3d40.79602810000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663993365939!5m2!1sen!2sbd"
                  ></iframe>
                  <Image
                    width={32}
                    height={50}
                    className="location-finder"
                    src="/assets/images/location.png"
                    alt="location"
                  />
                </div>
              </div>
            </div>
          </div>
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

export default Contact;

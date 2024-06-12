import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import CopyrightFooter from "./CopyrightFooter";

const Footer = () => {
  return (
    <>
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
              <div className="footer_about_widget">
                <h4>About Site</h4>
                <p>
                  We’re reimagining how you buy, sell and rent. It’s now easier
                  to get into a place you love. So let’s do this, together.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_qlink_widget">
                <h4>Lapazについて</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/">会社情報</Link>
                  </li>
                  <li>
                    <Link href="/">プライバシーポリシー</Link>
                  </li>
                  <li>
                    <Link href="/">ご利用ガイド</Link>
                  </li>
                  <li>
                    <Link href="/">サポートセンター</Link>
                  </li>
                  <li>
                    <Link href="/">特定商取引法に基づく表記</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_contact_widget">
                <h4>お問い合わせ</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="mailto:venus.seniordev@gmail.com">
                      venus.seniordev@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">東京都 目黒区 鷹番 3-8-4-301</a>
                  </li>
                  <li>
                    <a href="#">1520004, 日本</a>
                  </li>
                  <li>
                    <a href="tel:+8108058580044">+81 080-5858-0044</a>
                  </li>
                  <li>
                    <a href="tel:+8108058580044">+81 080-5858-0044</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="footer_social_widget">
                <h4>Follow us</h4>
                <ul className="mb30">
                  <Social />
                </ul>
                <h4>Subscribe</h4>
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_middle_area pt20 pb20">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Footer;

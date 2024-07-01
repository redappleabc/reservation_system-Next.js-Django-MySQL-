import { useSelector, useDispatch } from "react-redux";
import HeroSlider from "@/components/HeroSlider";
import GlobalHeroFilter from "@/components/common/GlobalHeroFilter";
import FeaturedProperties from "@/components/FeaturedProperties";
import CategoryList from "@/components/common/CategoryList";
import CheckBoxFilter from "@/components/common/CheckBoxFilter";
import Blogs from "@/components/common/Blogs";

export default function Home() {
  return (
    <div className="row">
      <div className="home-four ">
        <div className="container-fluid p0">
          <div className="main-banner-wrapper">
            <div className="arrow-style-2 banner-style-one ">
              <HeroSlider />
            </div>
          </div>
        </div>
        <div className="container home_iconbox_container">
          <div className="row posr">
            <div className="col-lg-12">
              <div className="home_content home4">
                <div className="home-text text-center">
                  <h2 className="fz55">タイトルが入ります。</h2>
                  <p className="fz18 color-white">
                    テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
                  </p>
                </div>
                <GlobalHeroFilter className="home4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="best-property" className="best-property bgc-f7">
        <div className="container ovh">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>RANKING</h2>
                <p>
                  テキストが入ります。テキストが入ります。テキストが入ります。
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="best_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="best-property" className="best-property bg-white">
        <div className="container ovh">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>新着</h2>
                <p>
                  テキストが入ります。テキストが入ります。テキストが入ります。
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="best_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="best-property" className="best-property bg-white">
        <div className="container ovh">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>カテゴリー</h2>
                <p>
                  テキストが入ります。テキストが入ります。テキストが入ります。
                </p>
              </div>
            </div>
          </div>
          <div className="row mb50 d-flex align-items-center justify-content-center">
            <CategoryList />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="best_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
          <div className="checkbox-list d-flex mt60">
            <CheckBoxFilter />
          </div>
        </div>
      </section>
      <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>お知らせ＆ブログ </h2>
                <p>News & Blog</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Blogs />
          </div>
        </div>
      </section>
    </div>
  );
}

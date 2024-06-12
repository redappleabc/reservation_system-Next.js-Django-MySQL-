'use client'

import Image from "next/image";
import featureProContent from "../../../data/properties";
import Slider from "react-slick";

const FeatureProperties = () => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {featureProContent.slice(0, 5).map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home7">
              <div className="thumb">
                <Image
                  width={300}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.img}
                  alt="properties identity"
                />

                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item.saleTag.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">{val}</a>
                      </li>
                    ))}
                  </ul>
                  <a className="fp_price" href="#">
                    ${item.price}
                    <small>/mo</small>
                  </a>
                  <h4 className="posr color-white">{item.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeatureProperties;

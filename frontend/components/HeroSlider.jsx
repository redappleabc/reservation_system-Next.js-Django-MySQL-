'use client'

import Slider from "react-slick";

const HeroSlider = () => {
  const settings = {
    dots: false,
    arrow: true,
    arrow: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <Slider {...settings} arrows={true}>
      <div className="slide slide-one image-1"></div>
      <div className="slide slide-one image-2"></div>
      <div className="slide slide-one image-3"></div>
      <div className="slide slide-one image-4"></div>
      <div className="slide slide-one image-5"></div>
    </Slider>
  );
};

export default HeroSlider;

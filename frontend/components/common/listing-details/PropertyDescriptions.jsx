'use client'

import { useState } from "react";

const PropertyDescriptions = () => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

  return (
    <>
      <p className="mb25">
        Evans Tower very high demand corner junior one bedroom plus a large
        balcony boasting full open NYC views. You need to see the views to
        believe them. Mint condition with new hardwood floors. Lots of closets
        plus washer and dryer.
      </p>
      <p className={click ? "gpara second_para white_goverlay mt10 mb10" : ""}>
        Fully furnished. Elegantly appointed condominium unit situated on
        premier location. PS6. The wide entry hall leads to a large living room
        with dining area. This expansive 2 bedroom and 2 renovated marble
        bathroom apartment has great windows. Despite the interior views, the
        apartments Southern and Eastern exposures allow for lovely natural light
        to fill every room. The master suite is surrounded by handcrafted
        milkwork and features incredible walk-in closet and storage space.
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <p className="mt10 mb10">
            Fully furnished. Elegantly appointed condominium unit situated on
            premier location. PS6. The wide entry hall leads to a large living
            room with dining area. This expansive 2 bedroom and 2 renovated
            marble bathroom apartment has great windows. Despite the interior
            views, the apartments Southern and Eastern exposures allow for
            lovely natural light to fill every room. The master suite is
            surrounded by handcrafted milkwork and features incredible walk-in
            closet and storage space.
          </p>
          <p className="mt10 mb10">
            Fully furnished. Elegantly appointed condominium unit situated on
            premier location. PS6. The wide entry hall leads to a large living
            room with dining area. This expansive 2 bedroom and 2 renovated
            marble bathroom apartment has great windows. Despite the interior
            views, the apartments Southern and Eastern exposures allow for
            lovely natural light to fill every room. The master suite is
            surrounded by handcrafted milkwork and features incredible walk-in
            closet and storage space.
          </p>
        </div>
      </div>
      <p className="overlay_close">
        <a
          className="text-thm fz14"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={handleClick}
        >
          Show More <span className="flaticon-download-1 fz12"></span>
        </a>
      </p>
    </>
  );
};

export default PropertyDescriptions;

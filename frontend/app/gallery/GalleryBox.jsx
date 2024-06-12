'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import galleryContent from "../../data/gallery.js";
import Image from "next/image.js";

const GalleryBox = () => {
  return (
    <>
      <Gallery>
        {galleryContent.map((singleItem) => (
          <div className="col-sm-6 col-md-6 col-lg-4" key={singleItem.id}>
            <div className="gallery_item">
              <Image
                width={364}
                height={218}
                className="img-fluid img-circle-rounded w100 cover"
                src={singleItem.img}
                alt="fp1.jpg"
              />
              <div className="gallery_overlay">
                <div className="icon popup-img">
                  <Item
                    original={singleItem.img}
                    thumbnail={singleItem.img}
                    width={752}
                    height={450}
                  >
                    {({ ref, open }) => (
                      <span
                        className="flaticon-zoom-in"
                        role="button"
                        ref={ref}
                        onClick={open}
                      ></span>
                    )}
                  </Item>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Gallery>
    </>
  );
};

export default GalleryBox;

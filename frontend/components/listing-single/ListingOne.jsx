'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import _ from "lodash";

import { paymethodList } from "@/utils/configInfo";

export default function ListingOne({ property }) {
  return (

    <section className="listing-title-area mt85 md-mt0">
      {
        property && (
          <div className="container">
            <Gallery>
              <div className="row mb30">
                <div className="col-lg-7 col-xl-8">
                  <div className="single_property_title mt30-767">
                    <h2>{property.title}</h2>
                    <p>{property.ServiceLocation?.prefecture}</p>
                  </div>
                </div>
                <div className="col-lg-5 col-xl-4">
                  <div className="single_property_social_share position-static transform-none">
                    <div className="price float-start fn-400">
                      <h2>
                        PT{property.DetailInfo?.point}/
                        <small>
                          {
                            paymethodList.find(item => item.key === property.DetailInfo?.paymethod)?.name
                          }
                        </small>
                      </h2>
                    </div>

                    <div className="spss style2 mt20 text-end tal-400">
                      <ul className="mb0">
                        <li className="list-inline-item">
                          <a href="#">
                            <span className="flaticon-transfer-1"></span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">
                            <span className="flaticon-heart"></span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">
                            <span className="flaticon-share"></span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">
                            <span className="flaticon-printer"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* End activity and social sharing */}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-sm-7 col-lg-8">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="spls_style_two mb30-520">
                        <Item
                          original={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(property, 'RelatedImages[0].path', '')}`}
                          thumbnail={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(property, 'RelatedImages[0].path', '')}`}
                          width={752}
                          height={450}
                        >
                          {({ ref, open }) => (
                            <div role="button" ref={ref}>
                              <img
                                width={752}
                                height={450}
                                className="img-fluid w100 cover lds-1"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(property, 'RelatedImages[0].path')}`}
                                alt="1.jpg"
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-sm-7 .col-lg-8 */}

                <div className="col-sm-5 col-lg-4">
                  <div className="row">
                    {
                      Array.isArray(property.RelatedImages) && property.RelatedImages.length > 0 && (
                        property.RelatedImages.filter((image, index) => index !== 0).map((image, index) => (
                          <div className="col-6" key={index}>
                            <div className="spls_style_two img-gallery-box mb24">
                              <Item
                                original={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(image, 'path', '')}`}
                                thumbnail={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(image, 'path', '')}`}
                                width={752}
                                height={450}
                              >
                                {({ ref, open }) => (
                                  <div role="button" ref={ref} onClick={open}>
                                    <img
                                      width={170}
                                      height={133}
                                      className="img-fluid w100 cover"
                                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${_.get(image, 'path', '')}`}
                                      alt="2.jpg"
                                    />
                                  </div>
                                )}
                              </Item>
                            </div>
                          </div>
                        ))
                      )
                    }
                  </div>
                </div>
                {/* End  col-sm-5 col-lg-4 */}
              </div>
              {/* End .row */}
            </Gallery>
          </div>
        )
      }
    </section>
  )
}

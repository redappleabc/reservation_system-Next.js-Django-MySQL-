
'use client'

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import properties from "../../data/properties";
import { frontendAxiosInstance } from "@/utils/http-common";
import { AllMainCategories, AllSubCategories, ServicePropertyList, AllTags, paymethodList } from "@/utils/configInfo";

const FeaturedItem = ({ isGridOrList, services, setServices }) => {

  const { isAuthenticate, user } = useSelector(state => state.auth);

  const handleClickBookMarked = async (service, serviceIndex) => {
    if (!isAuthenticate) {
      router.push('/auth/login');
    }

    const bookmarkedInfo = service.BookmarkedUsers;
    const index = bookmarkedInfo.findIndex(item => item.uuid === user.uuid);
    if (index >= 0) {
      const res = await frontendAxiosInstance.delete(`user/bookmarked/${service.uuid}`);
      bookmarkedInfo.splice(index, 1);
      service.BookmarkedUsers = bookmarkedInfo;
    } else {
      const res = await frontendAxiosInstance.post(`user/bookmarked/${service.uuid}`);
      const resultInfo = res.data.result.service;
      bookmarkedInfo.push({
        uuid: resultInfo.user_uuid,
        ServiceBookmarkedUser: {
          isView: false
        }
      })
      service.BookmarkedUsers = bookmarkedInfo;
    }

    const prevServices = [...services];
    prevServices[serviceIndex] = service;
    setServices(prevServices);
  }

  return (
    <>
      {
        services.map((item, index) => (
          <div
            className={`${isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
              } `}
            key={index}
          >
            <div
              className={`feat_property home7 style4 ${isGridOrList ? "d-flex align-items-center" : undefined
                }`}
            >
              <div className="thumb">
                <img
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.RelatedImages.length > 0 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.RelatedImages[0]?.path}` : '/assets/images/property/fp1.jpg'}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt top-property">
                  <ul className="tag mb0">
                    <li className="list-inline-item" style={{ width: 'auto' }}>
                      <span style={{ color: 'white' }}>
                        {
                          AllMainCategories.find(category => category.key === _.get(item, 'Category.main', ''))?.name
                        }
                      </span>
                    </li>
                    <br />
                    <li className="list-inline-item" style={{ width: 'auto' }}>
                      <span style={{ color: 'white' }}>
                        {
                          AllSubCategories.find(category => category.key === _.get(item, 'Category.sub', ''))?.name
                        }
                      </span>
                    </li>
                  </ul>

                  <ul className="icon mb0">
                    <li className="list-inline-item">
                      <a type="button">
                        <span className="flaticon-transfer-1"></span>
                      </a>
                    </li>
                    <li className="list-inline-item"
                      style={{
                        backgroundColor: isAuthenticate && item.BookmarkedUsers.some(value => value.uuid === user.uuid) && 'var(--color-primary)',
                        opacity: isAuthenticate && item.BookmarkedUsers.some(value => value.uuid === user.uuid) && 1,
                      }}>
                      <a type="button"
                        onClick={() => handleClickBookMarked(item, index)}>
                        <span className="flaticon-heart"></span>
                      </a>
                    </li>
                  </ul>

                  <Link
                    href={`/listing-details-v1/${item.uuid}`}
                    className="fp_price"
                  >
                    {
                      item.DetailInfo?.point && (item.DetailInfo.point + 'PT/')
                    }
                    <small>
                      {
                        paymethodList.find(method => method.key === _.get(item, 'DetailInfo.paymethod', 'fixed'))?.name
                      }
                    </small>
                  </Link>
                </div>
              </div>

              <div className="details">
                <div className="tc_content">
                  <p className="text-thm" style={{
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {
                      ServicePropertyList.find(property => property.key === _.get(item, 'type', ''))?.name
                    }
                  </p>
                  <h4>
                    <Link href={`/listing-details-v1/${item.uuid}`}>
                      <p style={
                        !isGridOrList ? {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        } : {}
                      }>
                        {
                          _.get(item, 'title', '')
                        }
                      </p>
                    </Link>
                  </h4>
                  <p style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    <span className="flaticon-placeholder"></span>
                    {_.get(item, 'ServiceLocation.prefecture', '')}{" "}
                    {_.get(item, 'ServiceLocation.city', '')}{" "}
                    {_.get(item, 'ServiceLocation.address', '')}
                  </p>

                  <ul className="prop_details mb0 gap-2 scrollbar-x-container-hidden"
                    style={
                      !isGridOrList ? {
                        whiteSpace: 'nowrap',
                        overflowX: 'scroll',
                      } : {}
                    }>
                    {
                      item.tags && item.tags.map((tag, index) => (
                        <li className="list-inline-item" key={index}>
                          <a href="#" className="d-flex border border-secondary border-1 rounded px-2 py-1" style={{ fontSize: '12px', color: '#333' }}>
                            {
                              AllTags.find(value => value.key === tag)?.name
                            }
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
};

export default FeaturedItem;

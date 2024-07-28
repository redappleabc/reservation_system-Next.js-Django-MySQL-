"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import _ from "lodash";

import DefaultImage from "@/public/assets/images/property/fp1.jpg";
import properties from "../../../data/properties";
import { paymethodList, ServiceStatusList, ServiceTypeList } from "@/utils/configInfo";

const TableData = ({ serviceList = [] }) => {

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Listing Title</th>
            <th scope="col" style={{ width: '120px', textAlign: 'center' }}>Date published</th>
            <th scope="col" style={{ width: '120px', textAlign: 'center' }}>Status</th>
            <th scope="col" style={{ width: '120px', textAlign: 'center' }}>View</th>
            <th scope="col" style={{ width: '200px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>
          {
            serviceList.map((item, index) => (
              <tr key={index}>
                <td scope="row">
                  <div className="feat_property list favorite_page style2" style={{ width: '800px' }}>
                    <div className="thumb">
                      <img
                        width={150}
                        height={220}
                        className="img-whp cover"
                        src={item.RelatedImages.length > 0 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.RelatedImages[0]?.path}` : '/assets/images/property/fp1.jpg'}
                        alt="header image"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item">
                            <a href="#">For Rent</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4 style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {item.title}
                        </h4>
                        <p>
                          <span className="flaticon-placeholder"></span>
                          {item.ServiceLocation?.prefecture}{" "}{item.ServiceLocation?.city}
                          <br />
                          {item.ServiceLocation?.address}
                        </p>
                        <a className="fp_price text-thm" href="#">
                          <span className="status_tag badge">
                            {
                              ServiceTypeList.find(type => type.key === item.DetailInfo?.type) ? ServiceTypeList.find(type => type.key === item.DetailInfo?.type).name : '未確認'
                            }
                          </span>
                          <span>PT{item.DetailInfo?.point}</span>
                          <small>/{_.get(paymethodList.find(paymethod => paymethod.key === item.DetailInfo?.paymethod), 'name', '未確認')}</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
                {/* End td */}

                <td style={{ textAlign: 'center' }}>{format(new Date(item.updatedAt), 'yyyy/MM/dd')}</td>
                {/* End td */}

                <td style={{ textAlign: 'center' }}>
                  <span className="status_tag badge">
                    {_.get(ServiceStatusList.find(statusType => statusType.key === item.status), 'name')}
                  </span>
                </td>
                {/* End td */}

                <td style={{ textAlign: 'center' }}>{item.viewerCount}</td>
                {/* End td */}

                <td style={{ textAlign: 'center' }}>
                  <ul className="view_edit_delete_list mb0">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <Link href={`/dashboard/properties/${item.uuid}`}>
                        <span className="flaticon-edit"></span>
                      </Link>
                    </li>
                    {/* End li */}

                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <a href="#">
                        <span className="flaticon-garbage"></span>
                      </a>
                    </li>
                  </ul>
                </td>
                {/* End td */}
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default TableData;

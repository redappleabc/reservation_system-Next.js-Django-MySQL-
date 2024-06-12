
'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAgentItemLength } from "../../features/agent/agentSlice";
import agents from "../../data/agents";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Ratings from "../blog-details/Ratings";

const Team = () => {
  const { name, category, city, listen } =
    useSelector((state) => state.agent) || {};
  const dispatch = useDispatch();

  // name
  const nameHandler = (item) =>
    item.name.toLowerCase().includes(name.toLowerCase());

  // category
  const categoryHandler = (item) =>
    item.type.toLowerCase().includes(category.toLowerCase());

  // city
  const cityHandler = (item) =>
    item.city.toLowerCase().includes(city.toLowerCase());

  let content = agents
    .slice(7, 16)
    .filter(nameHandler)
    .filter(categoryHandler)
    .filter(cityHandler)
    .filter((item) =>
      item.noOfListings.toLowerCase().includes(listen.toLowerCase())
    )
    .map((item) => (
      <div className="col-md-6 col-lg-6" key={item.id}>
        <div className="feat_property home7 agent">
          <div className="thumb">
            <Link href={`/seller-details/${item.id}`}>
              <Image
                width={342}
                height={222}
                className="img-whp w-100 h-100 cover overflow-hidden"
                src={item.img}
                alt="bh1.jpg"
              />
            </Link>
            <div className="crown-layout">
              <div className="position-relative">
                
                <FontAwesomeIcon icon={faCrown} size="3x" className={
                  item.ranking >= 1 && item.ranking <=3 ? "gold-icon" : item.ranking >=4 && item.ranking <=10 ? "silver-icon" : "bronze-icon"
                }/>
                <h6 className="crown-number">{item.ranking}</h6>
              </div>
            </div>
            <div className="thmb_cntnt">
              <div className="level-btn">
                {item.noOfListings} レベル
              </div>
              <div className="sub-detail-info d-flex align-items-center justify-content-between">
                <Ratings />
                <ul className="prop_details mb0">
                  <li>
                    <a href="#">評価: {item.ratings}</a>
                  </li>
                  <li>
                    <a href="#">合計レビュ: {item.noOfListings}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>
                <Link href={`/seller-details/${item.id}`}>{item.name}<span className="text-thm seller-view-type">({item.type})</span></Link>
              </h4>
            </div>
            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
              </ul>
              <div className="fp_pdate float-end ">
                <Link href={`/seller-details/${item.id}`} className="text-thm">
                プロフィールを見る <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  useEffect(() => {
    dispatch(addAgentItemLength(content.length));
  }, [dispatch, content]);

  return <>{content}</>;
};

export default Team;

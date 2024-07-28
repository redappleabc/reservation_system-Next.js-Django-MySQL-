"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import DateTimeReservation from "./DateTimeReservation";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import Option from "./Option";

const CreateListing = () => {

  const router = useRouter();
  const [newService, setNewService] = useState({});

  const handleClickFinishBtn = () => {
    router.push('/dashboard/properties');
  }

  return (
    <div className="row">
      <div className="col-lg-12 mb10">
        <div className="breadcrumb_content style2">
          <h2 className="breadcrumb_title">サービス登録</h2>
          <p>Add new service!</p>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_dashboard_review">
          <div className="row" id="service-maind+Data">
            <div className="col-lg-12">
              <h3 className="mb30">サービス登録</h3>
            </div>
            <CreateList newService={newService} setNewService={setNewService} />
          </div>
        </div>
        <div className="my_dashboard_review mt30" id="service-locationData">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb30">場所</h3>
            </div>
            <LocationField service={newService} setService={setNewService} />
          </div>
        </div>
        <div className="my_dashboard_review mt30" id="service-detailData">
          <div className="col-lg-12">
            <h3 className="mb30">詳細情報</h3>
          </div>
          <DetailedInfo service={newService} setService={setNewService} />
        </div>
        <div className="my_dashboard_review mt30" id="service-mediaData">
          <div className="col-lg-12">
            <h3 className="mb30">画像のアップロード</h3>
          </div>
          <PropertyMediaUploader service={newService} setService={setNewService} />
        </div>
        <div className="my_dashboard_review mt30 dateTimeLayout" id="service-datatimeData">
          <div className="col-lg-12">
            <h3 className="mb30">利用期間</h3>
          </div>
          <DateTimeReservation service={newService} setService={setNewService} />
        </div>
        <div className="my_dashboard_review mt30 dateTimeLayout" id="service-option">
          <div className="col-lg-12">
            <h3 className="mb30">オプション</h3>
          </div>
          <Option service={newService} setService={setNewService} />
        </div>
      </div>
      <div className="col-lg-12 mt-4">
        <div className="my_profile_setting_input d-flex flex-row justify-content-center">
          <button className="btn btn2" style={{ width: '140px' }} onClick={handleClickFinishBtn}>
            完了
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;

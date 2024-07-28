"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import CreateList from "../../create-listing/CreateList";
import DetailedInfo from "../../create-listing/DetailedInfo";
import DateTimeReservation from "../../create-listing/DateTimeReservation";
import LocationField from "../../create-listing/LocationField";
import PropertyMediaUploader from "../../create-listing/PropertyMediaUploader";
import Option from "../../create-listing/Option";
import { frontendAxiosInstance } from "@/utils/http-common";

const ServiceViewDetail = () => {

  const router = useRouter();
  const { id: serviceId } = useParams();
  const { user } = useSelector(state => state.auth);

  const [service, setService] = useState({});

  const fetchServiceInfo = async () => {
    if (user) {
      try {
        const res = await frontendAxiosInstance.get(`service/${user.uuid}/${serviceId}`);
        const resultInfo = res.data.result.service;
        setService(resultInfo);
      } catch (err) {
        toast.error(err.response?.data.error);
      }
    }
  }

  useEffect(() => {
    fetchServiceInfo();
  }, [serviceId, user])

  const handleClickFinishBtn = () => {
    router.push('/dashboard/properties');
  }

  return (
    <div className="row">
      <div className="col-lg-12 mb10">
        <div className="breadcrumb_content style2">
          <h2 className="breadcrumb_title">サービス編集</h2>
          <p>Update service!</p>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_dashboard_review">
          <div className="row" id="service-maind+Data">
            <div className="col-lg-12">
              <h3 className="mb30">サービス編集</h3>
            </div>
            <CreateList newService={service} setNewService={setService} />
          </div>
        </div>
        <div className="my_dashboard_review mt30" id="service-locationData">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb30">場所</h3>
            </div>
            <LocationField service={service} setService={setService} />
          </div>
        </div>
        <div className="my_dashboard_review mt30" id="service-detailData">
          <div className="col-lg-12">
            <h3 className="mb30">詳細情報</h3>
          </div>
          <DetailedInfo service={service} setService={setService} />
        </div>
        <div className="my_dashboard_review mt30" id="service-mediaData">
          <div className="col-lg-12">
            <h3 className="mb30">画像のアップロード</h3>
          </div>
          <PropertyMediaUploader service={service} setService={setService} />
        </div>
        <div className="my_dashboard_review mt30 dateTimeLayout" id="service-datatimeData">
          <div className="col-lg-12">
            <h3 className="mb30">利用期間</h3>
          </div>
          <DateTimeReservation service={service} setService={setService} />
        </div>
        <div className="my_dashboard_review mt30 dateTimeLayout" id="service-option">
          <div className="col-lg-12">
            <h3 className="mb30">オプション</h3>
          </div>
          <Option service={service} setService={setService} />
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

export default ServiceViewDetail;

"use client";

import { useState, useEffect } from "react";
import _ from "lodash";

import { frontendAxiosInstance } from "@/utils/http-common";
import toast from "react-hot-toast";

const LocationField = ({ service, setService }) => {

  const [formData, setFormData] = useState({
    place: "",
    prefecture: "",
    city: "",
    address: "",
    postcode: ""
  })

  useEffect(() => {
    setFormData({
      place: _.get(service.ServiceLocation, 'place', ''),
      prefecture: _.get(service.ServiceLocation, 'prefecture', ''),
      city: _.get(service.ServiceLocation, 'city', ''),
      address: _.get(service.ServiceLocation, 'address', ''),
      postcode: _.get(service.ServiceLocation, 'postcode', '')
    })
  }, [service])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    if (!Object.values(formData).some(value => value)) {
      return;
    }
    try {
      let payload = formData;
      if (service) {
        payload = {
          serviceId: service.uuid,
          ...formData
        }
      }
      const res = await frontendAxiosInstance.post('service/location', payload);
      setService(res.data.result.service);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="place">場所</label>
          <input type="text" className="form-control" id="place" name="place" value={formData.place} onChange={handleInputChange} />
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="prefecture">都道府県</label>
          <select className="selectpicker w100 show-tick form-select" id="prefecture" name="prefecture" value={formData.prefecture} onChange={handleInputChange}>
            <option value="北海道">北海道</option>
            <option value="青森県">青森県</option>
            <option value="岩手県">岩手県</option>
            <option value="宮城県">宮城県</option>
            <option value="秋田県">秋田県</option>
            <option value="山形県">山形県</option>
            <option value="福島県">福島県</option>
            <option value="茨城県">茨城県</option>
            <option value="栃木県">栃木県</option>
            <option value="群馬県">群馬県</option>
            <option value="埼玉県">埼玉県</option>
            <option value="千葉県">千葉県</option>
            <option value="東京都">東京都</option>
            <option value="神奈川県">神奈川県</option>
            <option value="新潟県">新潟県</option>
            <option value="富山県">富山県</option>
            <option value="石川県">石川県</option>
            <option value="福井県">福井県</option>
            <option value="山梨県">山梨県</option>
            <option value="長野県">長野県</option>
            <option value="岐阜県">岐阜県</option>
            <option value="静岡県">静岡県</option>
            <option value="愛知県">愛知県</option>
            <option value="三重県">三重県</option>
            <option value="滋賀県">滋賀県</option>
            <option value="京都府">京都府</option>
            <option value="大阪府">大阪府</option>
            <option value="兵庫県">兵庫県</option>
            <option value="奈良県">奈良県</option>
            <option value="和歌山県">和歌山県</option>
            <option value="鳥取県">鳥取県</option>
            <option value="島根県">島根県</option>
            <option value="岡山県">岡山県</option>
            <option value="広島県">広島県</option>
            <option value="山口県">山口県</option>
            <option value="徳島県">徳島県</option>
            <option value="香川県">香川県</option>
            <option value="愛媛県">愛媛県</option>
            <option value="高知県">高知県</option>
            <option value="福岡県">福岡県</option>
            <option value="佐賀県">佐賀県</option>
            <option value="長崎県">長崎県</option>
            <option value="熊本県">熊本県</option>
            <option value="大分県">大分県</option>
            <option value="宮崎県">宮崎県</option>
            <option value="鹿児島県">鹿児島県</option>
            <option value="沖縄県">沖縄県</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label htmlFor="city">市区町村</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
            <option>千代田区</option>
            <option>中央区</option>
            <option>港区</option>
            <option>新宿区</option>
            <option>文京区</option>
            <option>台東区</option>
            <option>墨田区</option>
            <option>江東区</option>
            <option>品川区</option>
            <option>目黒区</option>
            <option>大田区</option>
            <option>世田谷区</option>
            <option>渋谷区</option>
            <option>中野区</option>
            <option>杉並区</option>
            <option>豊島区</option>
            <option>北区</option>
            <option>荒川区</option>
            <option>板橋区</option>
            <option>練馬区</option>
            <option>足立区</option>
            <option>葛飾区</option>
            <option>江戸川区</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-8 col-xl-8">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="address">住所</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="postcode">郵便番号</label>
          <input type="text" className="form-control" id="postcode" name="postcode" value={formData.postcode} onChange={handleInputChange} />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <div className="h400 bdrs8" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.721472711!2d-115.31508339643749!3d36.12519578053308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1669000531244!5m2!1sen!2sbd"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </>
  );
};

export default LocationField;

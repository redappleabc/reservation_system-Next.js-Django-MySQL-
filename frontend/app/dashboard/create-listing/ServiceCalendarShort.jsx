'use client';

import React, { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import toast from 'react-hot-toast';
import _ from "lodash";
import { format } from 'date-fns';

import { ServiceHourList } from '@/utils/configInfo';
import { frontendAxiosInstance } from '@/utils/http-common';

const ServiceCalendarShort = ({ service = [], setService = () => { return; } }) => {

  const initialData = {
    type: "spot",
    startDate: "",
    service_hours: "",
    paymethod: "fixed",
    maxmember: 10,
    point: 0,
  }
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData({
      type: "spot",
      startDate: format(_.get(service.DetailInfo, 'startDate') || Date.now(), 'yyyy/MM/dd H:i'),
      service_hours: _.get(service.DetailInfo, 'service_hours', ''),
      paymethod: _.get(service.DetailInfo, 'paymethod', 'fixed'),
      point: Number(_.get(service.DetailInfo, 'point', '0')),
      maxmember: Number(_.get(service.DetailInfo, 'maxmember', '0')),
    })
  }, [service])

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker3', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: Japanese,
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static',
      onChange: (selectedDates, dateStr, instance) => {
        setFormData((prev) => ({
          ...prev,
          startDate: dateStr
        }))
      }
    });
    flatpickr('#datetimepicker4', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: Japanese,
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static'
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCancel = () => {
    setFormData(initialData);
  }

  const handleSubmit = async () => {
    try {
      const isValid = Object.values(formData).every(value => {
        return value;
      });
      if (!isValid) return;

      let payload = formData;

      if (service) {
        payload = {
          ...formData,
          serviceId: service.uuid
        }
      }
      const res = await frontendAxiosInstance.post('service/date-time-info', payload);

      setService(res.data.result.service);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div>
      <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker3" data-target-input="nearest">
        <label htmlFor="datetimepicker3" style={{ marginRight: 20 }}>利用開始日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker3" style={{ background: 'white' }}
            value={formData.startDate} onChange={handleInputChange} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      {/* <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker4" data-target-input="nearest">
        <label htmlFor="datetimepicker4" style={{ marginRight: 20 }}>利用終了日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker4" style={{ background: 'white' }} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div> */}

      <div className="person-number mt-4 row d-flex flex-row align-items-center">
        <label htmlFor="service_hours" className='col-sm-4'>サービス時間</label>
        <div className="col-sm-8">
          <select className="form-control flex-grow-1" value={formData.service_hours}
            onChange={handleInputChange} name='service_hours' id='service_hours'>
            <option value="">時間を選択してください。</option>
            {
              ServiceHourList.map((item, index) => (
                <option key={index} value={item.key}>{item.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="person-number mt-4">
        <label htmlFor="maxmember">最大同時予約スロット</label>
        <div className="d-flex align-items-center justify-content-start">
          <input type="number" placeholder='10' className="form-control flex-grow-1" value={formData.maxmember}
            onChange={handleInputChange} name='maxmember' id='maxmember' />
          <span style={{ whiteSpace: 'nowrap' }}>個（人）</span>
        </div>
      </div>

      <div className='mt-4'>
        <span>お支払い方法</span>
        <div className="form-group row align-items-center justify-content-center mx-0 my-2">
          <div className='row align-items-center justify-content-center' style={{ padding: '0px' }} >
            <div className="form-check col">
              <input className="form-check-input" type="radio" name="paymethod" id="flexRadioDefault1"
                value="minutely" checked={formData.paymethod === 'minutely'} onChange={handleInputChange} readOnly disabled />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                毎分
              </label>
            </div>
            <div className="form-check col">
              <input className="form-check-input" type="radio" name="paymethod" id="flexRadioDefault2"
                value="daily" checked={formData.paymethod === 'daily'} onChange={handleInputChange} readOnly disabled />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                一日
              </label>
            </div>
            <div className="form-check col">
              <input className="form-check-input" type="radio" name="paymethod" id="flexRadioDefault3"
                value="fixed" checked={formData.paymethod === 'fixed'} onChange={handleInputChange} readOnly />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                固定料金制
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="point-number mt-4">
        <label htmlFor="point">消費ポイント</label>
        <div className="d-flex align-items-center justify-content-start">
          <input type="number" placeholder="1" className="form-control" id='point' name='point' value={formData.point} onChange={handleInputChange} />
          PT
        </div>
      </div>
      <div className="reservation-btn-layout">
        <button onClick={handleCancel} className="btn btn-thm">
          クリア
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-thm reservation-btn"
        >
          適用する
        </button>
      </div>
    </div>
  );
};

export default ServiceCalendarShort;

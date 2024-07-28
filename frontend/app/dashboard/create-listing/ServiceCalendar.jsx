'use client';

import { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import toast from 'react-hot-toast';
import _ from "lodash";
import { format } from 'date-fns';

import { frontendAxiosInstance } from '@/utils/http-common';

const ServiceCalendar = ({ service, setService }) => {

  const initialData = {
    type: "long-term",
    startDate: "",
    endDate: "",
    paymethod: "minutely",
    point: 0,
    maxmember: 0,
  }

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData({
      type: "long-term",
      startDate: format(_.get(service.DetailInfo, 'startDate') || Date.now(), 'yyyy/MM/dd'),
      endDate: format(_.get(service.DetailInfo, 'endDate') || Date.now(), 'yyyy/MM/dd'),
      paymethod: _.get(service.DetailInfo, 'paymethod', 'minutely'),
      point: Number(_.get(service.DetailInfo, 'point', '0')),
      maxmember: Number(_.get(service.DetailInfo, 'maxmember', '0')),
    })
  }, [service])

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker5', {
      wrap: true,
      dateFormat: 'Y/m/d',
      locale: 'ja',
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

    flatpickr('#datetimepicker6', {
      wrap: true,
      dateFormat: 'Y/m/d',
      locale: 'ja',
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static',
      onChange: (selectedDates, dateStr, instance) => {
        setFormData((prev) => ({
          ...prev,
          endDate: dateStr
        }))
      }
    });
  }, []);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    const form = { ...formData };
    form[name] = value;
    setFormData(form)
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
      <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker5" data-target-input="nearest">
        <label htmlFor="datetimepicker5" style={{ marginRight: 20 }}>利用開始日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker5"
            style={{ background: 'white' }} name='startDate' value={formData.startDate} onChange={handleInputChange} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker6" data-target-input="nearest">
        <label htmlFor="datetimepicker6" style={{ marginRight: 20 }}>利用終了日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker6"
            style={{ background: 'white' }} name='endDate' value={formData.endDate} onChange={handleInputChange} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      <div className="person-number mt-4">
        <label htmlFor="">最大同時予約スロット</label>
        <div className="d-flex align-items-center justify-content-start">
          <input type="number" className="form-control flex-grow-1" value={formData.maxmember}
            onChange={handleInputChange} name='maxmember' />
          <span style={{ whiteSpace: 'nowrap' }}>個（人）</span>
        </div>
      </div>
      <div className='mt-4'>
        <span>お支払い方法</span>
        <div className="form-group row align-items-center justify-content-center mx-0 my-2">
          <div className='row align-items-center justify-content-center' style={{ padding: '0px' }} >
            <div className="form-check col">
              <input className="form-check-input" type="checkbox" name="paymethod" id="paymethod-minutely"
                value="minutely" checked={formData.paymethod === 'minutely'} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                毎分
              </label>
            </div>
            <div className="form-check col">
              <input className="form-check-input" type="checkbox" name="paymethod" id="paymethod-daily"
                value="daily" checked={formData.paymethod === 'daily'} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                一日
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="point-number mt-4">
        <label htmlFor="">消費ポイント</label>
        <div className="d-flex align-items-center justify-content-start">
          <input type="number" className="form-control" value={formData.point}
            onChange={handleInputChange} name='point' />
          PT
        </div>
      </div>
      <div className="reservation-btn-layout">
        <button className="btn btn-thm" onClick={handleCancel}>
          クリア
        </button>
        <button
          className="btn btn-thm reservation-btn"
          onClick={handleSubmit}
        >
          適用する
        </button>
      </div>
    </div>
  );
};

export default ServiceCalendar;

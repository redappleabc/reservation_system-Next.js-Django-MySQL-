'use client';

import React, {useEffect} from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const ServiceCalendarShort = () => {

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker3', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: 'ja',
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static'
    });
    flatpickr('#datetimepicker4', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: 'ja',
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static'
    });
  },[]);
  return (
    <div>
      <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker3" data-target-input="nearest">
        <label htmlFor="datetimepicker3" style={{marginRight: 20}}>利用開始日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker3" style={{ background: 'white' }} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      <div className="input-group d-flex align-items-center date mb-3" id="datetimepicker4" data-target-input="nearest">
        <label htmlFor="datetimepicker4" style={{marginRight: 20}}>利用終了日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker4" style={{ background: 'white' }} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      <div className="person-number mt-4">
        <label htmlFor="">最大同時予約スロット</label>
        <select
          className="selectpicker w100 show-tick form-select mt-2"
          style={{ height: "50px" }}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index}>
              {index} 個（人）
            </option>
          ))}
        </select>
      </div>
      <div className="point-number mt-4">
        <label htmlFor="">消費ポイント</label>
        <div className="d-flex align-items-center justify-content-start">
          <input type="text" placeholder="1" className="form-control" />
          PT
        </div>
      </div>
      <div className="reservation-btn-layout">
        <button onClick={() => {}} type="submit" className="btn btn-thm">
          クリア
        </button>
        <button
          onClick={() => {}}
          type="submit"
          className="btn btn-thm reservation-btn"
        >
          適用する
        </button>
      </div>
    </div>
  );
};

export default ServiceCalendarShort;

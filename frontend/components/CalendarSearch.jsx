'use client';

import React, {useEffect} from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const Calendar = () => {

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker1', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: 'en',
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static'
    });
    flatpickr('#datetimepicker2', {
      wrap: true,
      enableTime: true,
      dateFormat: 'Y/m/d H:i',
      defaultHour: now.getHours(),
      defaultMinute: now.getMinutes(),
      minuteIncrement: 1,
      locale: 'en',
      clickOpens: false,
      allowInput: true,
      monthSelectorType: 'static'
    });
  },[]);
  return (
    <div>
      <div className="input-group date mb-3" id="datetimepicker1" data-target-input="nearest">
        <label htmlFor="datetimepicker1" className="pt-2 pr-2">利用開始日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker1" style={{ background: 'white' }} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
        </div>
      </div>
      <div className="input-group date mb-3" id="datetimepicker2" data-target-input="nearest">
        <label htmlFor="datetimepicker2" className="pt-2 pr-2">利用終了日時:</label>
        <div className="d-flex">
          <input type="text" data-input className="form-control" data-target="#datetimepicker2" style={{ background: 'white' }} />
          <span className="input-group-text" data-toggle>
            <span className="fa fa-calendar"></span>
          </span>
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

export default Calendar;

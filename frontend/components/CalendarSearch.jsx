'use client';

import React, { useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import 'flatpickr/dist/flatpickr.min.css';
import { format } from 'date-fns';


const Calendar = ({ formData, setFormData }) => {

  const [startDate, setStartDate] = useState(formData['startDate'] || "");
  const [endDate, setEndDate] = useState(formData['endDate'] || "");
  const [startHour, setStartHour] = useState(formData['startHour'] || "");
  const [startMinute, setStartMinute] = useState(formData['startMinute'] || "");
  const [endHour, setEndHour] = useState(formData['endHour'] || "");
  const [endMinute, setEndMinute] = useState(formData['endMinute'] || "");

  useEffect(() => {
    const now = new Date();

    flatpickr('#datetimepicker1', {
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
        const startDate = new Date(dateStr);
        setStartDate(format(startDate, 'yyyy-MM-dd'));
        setStartHour(startDate.getHours());
        setStartMinute(startDate.getMinutes());
      }
    });
    flatpickr('#datetimepicker2', {
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
        const endDate = new Date(dateStr);
        setEndDate(format(endDate, 'yyyy-MM-dd'));
        setEndHour(endDate.getHours());
        setEndMinute(endDate.getMinutes());
      }
    });
  }, []);
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
        <button onClick={() => {
          setStartDate("");
          setEndDate("");
          setStartHour("");
          setStartMinute("");
          setEndHour("");
          setEndMinute("");
        }} className="btn btn-thm">
          クリア
        </button>
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              startDate,
              endDate,
              startHour,
              startMinute,
              endHour,
              endMinute,
            }))
          }}
          className="btn btn-thm reservation-btn"
        >
          適用する
        </button>
      </div>
    </div>
  );
};

export default Calendar;

'use client';

import ServiceCalendar from "./ServiceCalendar";
import ServiceCalendarShort from "./ServiceCalendarShort";
import React from "react";
import { useState } from "react";

const DateTimeReservation = () => {
  return (
    <div className="home_adv_srch_opt dateTimeReservation">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            長　期
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            スポット
          </a>
        </li>
      </ul>
      <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div>
            <ServiceCalendar />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div><ServiceCalendarShort /></div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeReservation;

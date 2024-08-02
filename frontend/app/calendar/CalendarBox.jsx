// https://codesandbox.io/s/blazing-pond-47crhl?file=/src/ReactBigCalendar.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import jaJP from 'date-fns/locale/ja'
import imageCompression from 'browser-image-compression';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';

const locales = {
    'ja': jaJP,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export default function CalendarBox() {
    const [eventsData, setEventData] = useState([]);
    const [selected, setSelected] = useState();

    return (
        <div className='business bhome'>
            <div className="board">
                <div className="cont mt-[10px] pb-[30px] relative">
                    <Calendar
                        views={["month"]}
                        selectable
                        culture='ja'
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={eventsData}
                        messages={{ next: "翌月", previous: "前月", today: "今日", }}
                        eventPropGetter={
                            event => {
                                let newStyle = {
                                    backgroundColor: "gray",
                                };
                                if (event.type === "start")
                                    newStyle.backgroundColor = "#959595";
                                else if (event.type === "end")
                                    newStyle.backgroundColor = "#F53C56";
                                else if (event.type === "middle")
                                    newStyle.backgroundColor = "#2C92D2";

                                return {
                                    className: "",
                                    style: newStyle
                                };
                            }
                        }
                        selected={selected}
                    />
                </div>
            </div>
        </div>
    );
}

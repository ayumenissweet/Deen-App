import moment from "moment-hijri";
import { useState } from "react";
import "../styles/Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());

  const daysInMonth = currentDate.iDaysInMonth();
  const firstDayOfMonth = currentDate.clone().startOf("iMonth").day();
  const today = moment().iDate();
  const isCurrentMonth = currentDate.iMonth() === moment().iMonth() &&
                         currentDate.iYear() === moment().iYear();

  const days = [];

  // Ajoute les jours vides au début
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Ajoute les jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "imonth"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "imonth"));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-btn1"></button>
        <h2>{currentDate.format("iMMMM iYYYY")}</h2>
        <button onClick={handleNextMonth} className="calendar-btn2"></button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              isCurrentMonth && day === today ? "today" : ""
            } ${day === null ? "empty" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
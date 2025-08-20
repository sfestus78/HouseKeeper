import React, { useState } from 'react';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Monday-start
  };

  const isToday = (day) => {
    return today.getDate() === day &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // const goToToday = () => {
  //   setCurrentMonth(today.getMonth());
  //   setCurrentYear(today.getFullYear());
  // };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(
      currentMonth - 1 < 0 ? 11 : currentMonth - 1,
      currentMonth - 1 < 0 ? currentYear - 1 : currentYear
    );
    
    const days = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${daysInPrevMonth - i}`} className="scheduledvisit-calendar-day scheduledvisit-calendar-day-other">
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const todayClass = isToday(day) ? ' scheduledvisit-calendar-day-today' : '';
      days.push(
        <div key={day} className={`scheduledvisit-calendar-day${todayClass}`}>
          {day}
        </div>
      );
    }

    // Next month's days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="scheduledvisit-calendar-day scheduledvisit-calendar-day-other">
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="scheduledvisit-calendar">
      <div className="scheduledvisit-calendar-content">
        <div className="scheduledvisit-calendar-header">
          <button
            className="scheduledvisit-calendar-nav scheduledvisit-calendar-nav-prev"
            onClick={previousMonth}
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/d1d6caede30fd97294c8146e11e2cb2e4912c1ef?placeholderIfAbsent=true"
              alt="Previous month"
              className="scheduledvisit-calendar-nav-icon"
            />
          </button>

          <h3 className="scheduledvisit-calendar-month">
            {months[currentMonth]} {currentYear}
          </h3>

          <button
            className="scheduledvisit-calendar-nav scheduledvisit-calendar-nav-next"
            onClick={nextMonth}
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/877d2213dc988340cc47a635720c570165088f34?placeholderIfAbsent=true"
              alt="Next month"
              className="scheduledvisit-calendar-nav-icon"
            />
          </button>

          {/* Today Button */}
          {/* <button
            className="scheduledvisit-calendar-today-btn"
            onClick={goToToday}
          >
            Today
          </button> */}
        </div>

        <div className="scheduledvisit-calendar-grid">
          <div className="scheduledvisit-calendar-weekdays">
            {daysOfWeek.map(day => (
              <div key={day} className="scheduledvisit-calendar-weekday">
                {day}
              </div>
            ))}
          </div>
          
          <div className="scheduledvisit-calendar-days">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

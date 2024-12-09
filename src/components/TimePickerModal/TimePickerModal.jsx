import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './TimePickerModal.css';
import moment from 'moment';

const TimePickerModal = ({ isOpen, onClose, onSelectDates, availableDates }) => {
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  if (!isOpen) return null;

  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, day));
          day++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const getNextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDates.has(date.toDateString());
  };

  const isInRange = (date) => {
    if (!rangeStart || !hoverDate || !date) return false;
    const start = new Date(Math.min(rangeStart.getTime(), hoverDate.getTime()));
    const end = new Date(Math.max(rangeStart.getTime(), hoverDate.getTime()));
    return date >= start && date <= end;
  };

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return;

    if (!rangeStart) {
      setRangeStart(date);
      setSelectedDates(new Set([date.toDateString()]));
    } else {
      const start = new Date(Math.min(rangeStart.getTime(), date.getTime()));
      const end = new Date(Math.max(rangeStart.getTime(), date.getTime()));
      
      const newSelectedDates = new Set();
      let current = new Date(start);
      
      while (current <= end) {
        newSelectedDates.add(current.toDateString());
        current = new Date(current.setDate(current.getDate() + 1));
      }
      
      setSelectedDates(newSelectedDates);
      setRangeStart(null);
    }
  };

  const handleDateHover = (date) => {
    if (rangeStart && date) {
      setHoverDate(date);
    }
  };

  const handleApply = () => {
    const sortedDates = Array.from(selectedDates)
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => a - b);
  
    const result = sortedDates.length > 1
      ? [sortedDates[0], sortedDates[sortedDates.length - 1]]
      : sortedDates;
  
    onSelectDates(result);
    onClose();
  };
  

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const isDateAvailable = (date) => {
    return availableDates.some(availableDate => 
      moment(availableDate).startOf('day').isSame(moment(date).startOf('day'))
    );
  };

  return (
    <div className="time-modal-overlay" onClick={onClose}>
      <div className="time-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="time-modal-title">Thời gian</div>

        <div className="time-modal-header">
          <button
            className="navigation-button"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="month-header">
            {formatDate(currentDate)}
          </div>
          <button
            className="navigation-button"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <ChevronRight size={20} />
          </button>
          <button className="navigation-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="calendar-container">
          <div className="month-calendar">
            <div className="weekdays">
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {getMonthData(currentDate).flat().map((date, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPastDay = date && date < today;
                const inRange = isInRange(date);

                return (
                  <div
                    key={index}
                    className={`day-cell ${date ? [
                      isToday(date) ? 'today' : '',
                      isSelected(date) ? 'selected' : '',
                      inRange ? 'in-range' : '',
                      isPastDay ? 'blurred-day' : ''
                    ].filter(Boolean).join(' ') : 'disabled'}`}
                    onClick={() => date && !isPastDay && handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                    disabled={!isDateAvailable(date)}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="month-calendar">
            <div className="weekdays">
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {getMonthData(getNextMonth(currentDate)).flat().map((date, index) => {
                const inRange = isInRange(date);
                return (
                  <div
                    key={index}
                    className={`day-cell ${date ? [
                      isToday(date) ? 'today' : '',
                      isSelected(date) ? 'selected' : '',
                      inRange ? 'in-range' : ''
                    ].filter(Boolean).join(' ') : 'disabled'}`}
                    onClick={() => date && handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                    disabled={!isDateAvailable(date)}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="selected-dates">
        <div style={{ flex: 1 }}>
  {selectedDates.size > 0 && (
    <span className="selected-date-tag">
      {Array.from(selectedDates).length > 1
        ? `${new Date(Array.from(selectedDates)[0]).toLocaleDateString('vi-VN')} - ${new Date(Array.from(selectedDates)[selectedDates.size - 1]).toLocaleDateString('vi-VN')}`
        : new Date(Array.from(selectedDates)[0]).toLocaleDateString('vi-VN')}
      <X
        size={14}
        onClick={() => {
          setSelectedDates(new Set());
          setRangeStart(null);
          setHoverDate(null);
        }}
      />
    </span>
  )}
</div>

          {selectedDates.size > 0 && (
            <button className="clear-button" onClick={() => {
              setSelectedDates(new Set());
              setRangeStart(null);
              setHoverDate(null);
            }}>
              Xóa
            </button>
          )}
          <button className="apply-button" onClick={handleApply}>
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
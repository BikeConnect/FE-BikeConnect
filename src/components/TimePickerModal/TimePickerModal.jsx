import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './TimePickerModal.css';

const TimePickerModal = ({ isOpen, onClose, onSelectDates }) => {
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const toggleDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 0 để chỉ so sánh ngày

    if (date < today) return; // Nếu ngày trong quá khứ, không thực hiện thao tác chọn

    const dateString = date.toDateString();
    const newSelectedDates = new Set(selectedDates);

    if (selectedDates.has(dateString)) {
      newSelectedDates.delete(dateString);
    } else {
      newSelectedDates.add(dateString);
    }

    setSelectedDates(newSelectedDates);
  };

  const handleApply = () => {
    const sortedDates = Array.from(selectedDates)
      .map(dateStr => new Date(dateStr)) // Giữ lại dạng Date thay vì chuyển thành chuỗi
      .sort((a, b) => a - b);
    onSelectDates(sortedDates);
    onClose();
  };
  
  

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="time-modal-overlay" onClick={onClose}>
      <div className="time-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Thêm tiêu đề "Thời gian" */}
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
          {/* Current Month */}
          <div className="month-calendar">
            <div className="weekdays">
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {getMonthData(currentDate).flat().map((date, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Đặt giờ về 0 để chỉ so sánh ngày
                const isPastDay = date && date < today;

                return (
                  <div
                    key={index}
                    className={`day-cell ${date ? [
                      isToday(date) ? 'today' : '',
                      isSelected(date) ? 'selected' : '',
                      isPastDay ? 'blurred-day' : ''
                    ].filter(Boolean).join(' ') : 'disabled'
                      }`}
                    onClick={() => date && !isPastDay && toggleDate(date)} // Chỉ cho phép chọn ngày từ hiện tại trở đi
                  >
                    {date ? date.getDate() : ''}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Next Month */}
          <div className="month-calendar">
            <div className="weekdays">
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {getMonthData(getNextMonth(currentDate)).flat().map((date, index) => (
                <div
                  key={index}
                  className={`day-cell ${date ? [
                    isToday(date) ? 'today' : '',
                    isSelected(date) ? 'selected' : '',
                  ].filter(Boolean).join(' ') : 'disabled'
                    }`}
                  onClick={() => date && toggleDate(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="selected-dates">
          <div style={{ flex: 1 }}>
            {Array.from(selectedDates).map(dateStr => (
              <span key={dateStr} className="selected-date-tag">
                {new Date(dateStr).toLocaleDateString('vi-VN')}
                <X
                  size={14}
                  onClick={() => {
                    const newDates = new Set(selectedDates);
                    newDates.delete(dateStr);
                    setSelectedDates(newDates);
                  }}
                />
              </span>
            ))}
          </div>
          {selectedDates.size > 0 && (
            <button className="clear-button" onClick={() => setSelectedDates(new Set())}>
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


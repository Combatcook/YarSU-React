import gsap from 'gsap';
import React from 'react';
import classnames from 'classnames';
import * as calendar from './calendar';
import './index.css';

import data from './data';
const holiday = data;

class Calendar extends React.Component {
  static defaultProps = {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    date: new Date(),
    onChange: Function.prototype // ничего не делает
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
    nextMode: 'Год',
    currentMode: 'Месяц'
  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  hideModal = () => {
    const modal = document.querySelector('.modal');
    gsap.to(modal, 0.5, {
      opacity: 0
    });
  }

  handlePrevMonthButtonClick = (mode) => {
    let date = new Date(this.year, this.month);

    if (mode === 'Месяц') {
      if (!(this.month === calendar.Month.January && this.year === this.props.years[0])) {
        date = new Date(this.year, this.month - 1);
        this.hideModal();
      }
    }
    else {
      if (this.year !== this.props.years[0]) {
        date = new Date(this.year - 1, this.month);
        this.hideModal();
      }
    }

    this.setState({ date });
  }

  handleNextMonthButtonClick = (mode) => {
    let date = new Date(this.year, this.month);

    if (mode === 'Месяц') {
      if (!(this.month === calendar.Month.December && this.year === this.props.years[this.props.years.length - 1])) {
        date = new Date(this.year, this.month + 1);
        this.hideModal();
      }
    }
    else {
      if (this.year !== this.props.years[this.props.years.length - 1]) {
        date = new Date(this.year + 1, this.month);
        this.hideModal();
      }
    }

    this.setState({ date });
  }

  handleSelectChange = (mode) => {
    const year = this.yearSelect.value;
    let month;

    if (mode === 'Месяц')
      month = this.monthSelect.value;
    else
      month = this.month;

    const date = new Date(year, month);
    this.setState({ date });

    this.hideModal();
  }

  handleDayClick = (e, date) => {
    const holidayDay = e.target;
    const modal = document.querySelector('.modal');

    if (holidayDay.classList.contains('holiday')) {
      const day = holiday.find(day =>
        (day.date.getMonth() === date.getMonth() &&
          day.date.getDate() === date.getDate())
      );

      modal.innerHTML = day.nameHolidayDay;

      gsap.to(modal, 0.5, {
        opacity: 1
      });
    }
    else {
      gsap.to(modal, 0.5, {
        opacity: 0
      });
    }

    this.setState({
      selectedDate: date
    });

    this.props.onChange(date);
  }

  changeMode = () => {
    const body = document.querySelector('body');

    if (this.state.currentMode === 'Год') {
      body.style.fontSize = '16px';
    }
    else {
      body.style = '';
    }

    this.setState({
      nextMode: this.state.currentMode,
      currentMode: this.state.nextMode
    });
  }

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate, currentMode } = this.state;

    const yearData = calendar.getYearData(this.year);

    let planer;

    if (currentMode === 'Год') {
      planer = (
        <div>
          <table>
            <tbody>
              {yearData.map((monthRow, indexRow) =>
                <tr key={indexRow}>
                  {monthRow.map((month, index) =>
                    <td key={index} className="month">
                      <h2 className="monthname">
                        {monthNames[indexRow * 4 + index]}
                      </h2>
                      <table>
                        <thead>
                          <tr>
                            {weekDayNames.map((name) =>
                              <th key={name}>{name}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {month.map((week, index) =>
                            <tr key={index} className="week">
                              {week.map((date, index) =>
                                date
                                  ? <td key={index}
                                    className={classnames('day', {
                                      'today': calendar.areEqual(date, currentDate),
                                      'selected': calendar.areEqual(date, selectedDate)
                                    }, {
                                      'holiday': calendar.isHoliday(date, holiday)
                                    })}
                                    onClick={(e) => this.handleDayClick(e, date)}
                                  >
                                    {date.getDate()}
                                  </td>
                                  : <td key={index}></td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          <div className="modal"></div>
        </div>
      );
    }
    else {
      const partIndex = Math.floor(this.month / 4);
      const monthIndex = this.month - partIndex * 4;
      const month = yearData[partIndex][monthIndex];

      planer = (
        <div>
          <table key={partIndex} className="month">
            <thead>
              <tr>
                {weekDayNames.map((name) =>
                  <th key={name}>{name}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {month.map((week, index) =>
                <tr key={index} className="week">
                  {week.map((date, index) =>
                    date
                      ? <td key={index}
                        className={classnames('day', {
                          'today': calendar.areEqual(date, currentDate),
                          'selected': calendar.areEqual(date, selectedDate)
                        }, {
                          'holiday': calendar.isHoliday(date, holiday)
                        })}
                        onClick={(e) => this.handleDayClick(e, date)}
                      >
                        {date.getDate()}
                      </td>
                      : <td key={index}></td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          <div className="modal"></div>
        </div>
      );
    }

    return (
      <div className="calendar">
        <button className="mode-button" onClick={this.changeMode}>
          Перейти в режим {this.state.nextMode}
        </button>
        <header className="header">
          <button onClick={() => this.handlePrevMonthButtonClick(currentMode)}>{'<'}</button>
          {currentMode === 'Месяц'
            ? <select
              onChange={() => this.handleSelectChange(currentMode)}
              ref={element => this.monthSelect = element}
              value={this.month}
            >
              {monthNames.map((name, index) =>
                <option key={name} value={index}>{name}</option>
              )}
            </select>
            : null
          }
          <select
            onChange={() => this.handleSelectChange(currentMode)}
            ref={element => this.yearSelect = element}
            value={this.year}
          >
            {years.map((year) =>
              <option key={year} value={year}>{year}</option>
            )}
          </select>
          <button onClick={() => this.handleNextMonthButtonClick(currentMode)}>{'>'}</button>
        </header>
        {planer}
      </div>
    );
  }
}

export default Calendar;
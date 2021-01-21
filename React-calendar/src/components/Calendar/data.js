import dataHoliday from './dataFirst.js';

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

let holiday = [];

dataHoliday.forEach( month => {

  const name = month.name;
  const indexMonth = monthNames.findIndex( month => month === name);

  month.fiesta.forEach( holidayDay => {
    const nameHolidayDay = holidayDay.name;
    const numberDay = holidayDay.day;

    const date = new Date(2020, indexMonth, numberDay);

    holiday.push({
      date,
      nameHolidayDay
    });
  });
});

export default holiday;




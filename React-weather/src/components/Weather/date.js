// вспомогательные функции для работы с датами
export const Month = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export const Week = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export function addZero(value) {
    return value < 10 ? "0" + value : value;
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    return Week[dayOfWeek];
}

export function getMonthName(date) {
    const month = date.getMonth();

    return Month[month];
}


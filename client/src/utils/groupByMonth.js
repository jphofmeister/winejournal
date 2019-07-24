const sortByMonth = (a, b) => new Date(b).valueOf() - new Date(a).valueOf();

const getMonthAndYear = wine => {
  const date = new Date(wine.tasteDate);
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);
  date.setDate(1);
  return date.toISOString();
}

const groupByMonth = wines => {
    const groups = wines.reduce((months, wine) => {
        const month = getMonthAndYear(wine);
        if (!months[month]) {
            months[month] = [];
        }
        months[month] = months[month].concat(wine);
        return months;
    }, {});
    return {
      months: Object.keys(groups).sort(sortByMonth),
      winesByMonth: groups,
    };
};

 export default groupByMonth;
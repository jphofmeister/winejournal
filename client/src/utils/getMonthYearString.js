const getMonthYearString = date =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long'
  });


export default getMonthYearString;
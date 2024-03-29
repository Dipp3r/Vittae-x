function dateToString(dateObj, mode) {
  let date = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  date = date < 10 ? `0${date}` : date;
  month = month < 10 ? `0${month}` : month;
  switch (mode) {
    case 1:
    default:
      return `${date} ${month} ${year}`;
    case 2:
      return `${year} ${month} ${date}`;
    case 3:
      return `${month} ${date} ${year}`;
  }
}
export default dateToString;
// console.log(dateToString(new Date(),1))

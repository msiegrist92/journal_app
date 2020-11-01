//function which returns correct link for current month to be used in partials
///calendar/9&2020


const currentCalLink = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getYear() + 1900;
  return '/calendar/' + month + '&' + year;
}

module.exports = {
  currentCalLink : currentCalLink
}

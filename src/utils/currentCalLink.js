//function which returns correct link for current month
///calendar/9&2020
//return string value and in router set in_links.link_2 : determineLink()

const currentCalLink = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getYear() + 1900;
  return '/calendar/' + month + '&' + year;
}

module.exports = {
  currentCalLink : currentCalLink
}

const date = new Date().toString();
const REGEXP = /[\w\W]*(?= \d\d:)/g;

const formatDate = string_date => {
  const REGEXP = /[\w\W]*(?= \d\d:)/g;
  return date.match(REGEXP)[0]
}

module.exports = formatDate;

//Sun Sep 20, 2020

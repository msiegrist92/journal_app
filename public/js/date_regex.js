//formats Date.toString() to same format as used in the database
const formatDate = string_date => {
  const REGEXP = /[\w\W]*(?= \d\d:)/g;
  return string_date.match(REGEXP)[0]
}

const getMonth = string_date => {
  const REGEXP = / \w\w\w /
  let month = string_date.match(REGEXP)[0];
  return month.trim();
}

const getYear = string_date => {
  const REGEXP = /[0-9]{4}/
  return string_date.match(REGEXP)[0];
}

const getDate = string_date => {
  const REGEXP = /[0-9][0-9]/
  return string_date.match(REGEXP)[0];
}

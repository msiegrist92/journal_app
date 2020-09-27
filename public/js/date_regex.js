//formats Date.toString() to same format as used in the database
//following REGEXPS work with date().toString() as stored in DB
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

//WIP
const verifyFormat = date => {
  const REGEXP = /^\d\d\/\d\d\/\d\d$/g;
  if(date.match(REGEXP) == null){
    return false
  }
  else {
    return true
  }
}

const mmddyyToStr = date => {
  console.log(date);
  date = date.split('/');
  date[0] -= 1
  date[2] = '20' + date[2];
  console.log(date);
  console.log(new Date(date[2], date[0], date[1]).toString());
  return formatDate(new Date(date[2], date[0], date[1]).toString());
}

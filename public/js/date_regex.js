alert('date_rege.js');

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
  date = date.split('/');
  date[0] -= 1
  date[2] = '20' + date[2];
  return formatDate(new Date(date[2], date[0], date[1]).toString());
}

//function passed a formatDate - returns mmddyy date

const formatTommddyy = str_date => {
  const year = getYear(str_date).substring(2);
  const date = getDate(str_date);
  const abbr_month = getMonth(str_date);
  let month_index;
  for(let month of months){
    if(month.abbr === abbr_month){
      month_index = month.index + 1;
      if(month_index < 10){
        month_index = '0' + month_index.toString();
      }
    }
  }
  return `${month_index}/${date}/${year}`
}

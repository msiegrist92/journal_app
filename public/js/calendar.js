const days_list = document.querySelectorAll('.day');
const today = new Date();

const buildCalendar = (first_day, month_length) => {
  for(let i = 0; i < month_length; i++){
    days_list[first_day + i].classList.toggle('in_month');
    if (i < 9){

      //single digit days have 0 added to match the string content of database entries
      days_list[first_day + i].textContent += ' ' + '0' + (i + 1);

    } else {
      days_list[first_day + i].textContent += ' ' + (i + 1);
    }
  }
}

const highlightToday = (today) => {
  let today_element = days_list[(today.getDate() + 1)];
  today_element.classList.toggle('today');
}

const defineCalendar = (month, year) => {
  let month_length = months[month].days;

  let first_month = new Date(year, month, 1);
  let first_day = first_month.getDay();

  buildCalendar(first_day, month_length);

  document.getElementById('month').textContent = months[month].name;

  //removing text from .day elements which are not included in calendar
  for(let days of days_list){
    if (days.classList.length === 1){
      days.textContent = '';
    }
  }
}

const getEntries = (month_name) => {
  return fetch('entries/months/' + month_name)
  .then((response) => {
    return response.json();
  }).then((entries) => entries
)}

const isInYear = (entry, year) => {
  if (getYear(entry.date) === year){
      return true
  } else {
    return false;
  }
}

const addEntryData = (date, match) => {
  date.style.backgroundColor = 'rgba(33, 186, 43, 0.5)';

  let exp = document.createElement('em');
  date.appendChild(exp);
  exp.textContent += '\n' + 'Expenses : ' + match.expenses;

  if(match.income > 0){
    let inc = document.createElement('em');
    date.appendChild(inc);
    inc.textContent += '\n' + 'Income : ' + match.income;
  }
}

const totalFinances = (matches, value) => {
  let val = 0;
  for (match of matches){
    val += match[value]
  }
  return val;
}

const displayMonthFinances = (exp, inc) => {
  let el = document.getElementById("inc_exp");
  el.textContent = `Total Expenses : ${exp} - Total Income : ${inc}`;
}



const showEntriesMade = (today) => {

  let today_str = today.toString();
  let cal_month = getMonth(today_str);
  let cal_year = getYear(today_str);
  let in_month = document.querySelectorAll('.in_month');

  getEntries(cal_month).then(response => {
    let matches = [];
    for (entry of response){
      if(isInYear(entry, cal_year)){
        matches.push(entry);
      }
    }

    let total_inc = totalFinances(matches, 'income')
    let total_exp = totalFinances(matches, 'expenses');
    displayMonthFinances(total_exp, total_inc);

    for (match of matches){
      for(date of in_month){
        let day = date.textContent;
        if (getDate(match.date) == getDate(day)){
          addEntryData(date, match)
        }
      }
    }
  })
}



defineCalendar(today.getMonth(), today.getFullYear());
highlightToday(today);
showEntriesMade(today);

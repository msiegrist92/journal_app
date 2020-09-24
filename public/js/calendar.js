const days_list = document.querySelectorAll('.day');


const highlightToday = () => {
  let today = new Date();
  let today_element = days_list[(today.getDate() + 1)];
  today_element.classList.toggle('today');
}

const defineCalendar = () => {
  let today = new Date();
  let month_length = months[today.getMonth()].days;

  let first_month = new Date(today.getFullYear(), today.getMonth(), 1);
  let first_day = first_month.getDay();

  for(let i = 0; i < month_length; i++){
    days_list[first_day + i].classList.toggle('in_month');
    if (i < 9){
      days_list[first_day + i].textContent += ' ' + '0' + (i + 1);
    } else {
      days_list[first_day + i].textContent += ' ' + (i + 1);
    }
  }

  document.getElementById('month').textContent = months[today.getMonth()].name;

  for(let days of days_list){
    if (days.classList.length === 1){
      days.textContent = '';
    }
  }
}

const getEntries = () => {
  return fetch('entries')
  .then((response) => {
    return response.json();
  }).then((entries) => entries
)}

const showEntriesMade = () => {
  let today = new Date().toString();
  let cal_month = getMonth(today);
  let cal_year = getYear(today);
  let in_month = document.querySelectorAll('.in_month');
  //retrieve all entries from DB where month of date is month of calendar and year of date is this calendar year
  getEntries().then(response => {
    let matches = [];
    for (entry of response){
      if(getYear(entry.date) === cal_year &&
        getMonth(entry.date) === cal_month){
          matches.push(entry);
        }
    }
    for (match of matches){
      for(date of in_month){
        let day = date.textContent;
        console.log(day);
        if (getDate(match.date) == getDate(day)){
          date.style.backgroundColor = 'rgba(33, 186, 43, 0.5)';
        }
      }
    }
  })
}



defineCalendar();
highlightToday();
showEntriesMade();

// const day_length = 86400000;
//
// const today = new Date();
// const month = today.getMonth();
// const year = today.getYear();
// const day = today.getDay();
// const ms = today.getTime();
//
// const yesterday_ms = ms - day_length;
// const yesterday = new Date(yesterday_ms);

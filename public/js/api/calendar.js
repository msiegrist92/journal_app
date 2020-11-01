//will need to add year to this API router
const getEntries = (month_name) => {
  if(!sessionStorage.token){
    return displayMsg("Session expired please log in");
  }

  return fetch('/entries/months/' + month_name, {
    credentials: "include",
    mode: "cors",
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.token
    }
  })
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


//date is the element corresponding to the day of the entry
const addEntryData = (date, match) => {
  if(match.sleep < 7 || match.diet < 7){
    date.style.backgroundColor = 'rgba(218, 223, 78, 0.32)';
  } else {
    date.style.backgroundColor = 'rgba(33, 186, 43, 0.3)';
  }
  let exp = document.createElement('em');
  date.appendChild(exp);
  exp.textContent += '\n' + 'Expenses ' + match.expenses;

  if(match.income > 0){
    let inc = document.createElement('em');
    date.appendChild(inc);
    inc.textContent += '\n' + 'Income ' + match.income;
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
  el.textContent = `Total Expenses : ${exp}\nTotal Income : ${inc}`;
}

const fillFirstWeek = () => {
  let first_day = document.querySelector('.day').textContent.split('\n')[1]
  let to_fill = days_abbr.indexOf(first_day);
  let parent_element = document.getElementById('days_cont');
  for(let i = 0; i < to_fill; i++){
    parent_element.prepend(document.createElement('div'));
  }
}


const showEntriesMade = (month, year) => {

  //use appropriate array method here
  //cal_month should be string month of current url
  getEntries(month).then(response => {
    let matches = [];
    for (entry of response){
      if(isInYear(entry, year)){
        matches.push(entry);
      }
    }

    let total_inc = totalFinances(matches, 'income')
    let total_exp = totalFinances(matches, 'expenses');
    displayMonthFinances(total_exp, total_inc);

    for (match of matches){
      let date = getDate(match.date);
      addEntryData(days_list[date - 1], match)
    }
  })
}

const highlightToday = (today) => {
  let today_element = days_list[(today.getDate() - 1)];
  today_element.classList.toggle('today');
}

const days_list = document.querySelectorAll('.day');
const today = new Date();

const month = window.location.href.match(monthURL);
const year = window.location.href.match(yearURL)[0];

const selected_month = months[month].abbr;

fillFirstWeek();

//show entries made is passed a Date().toString()
showEntriesMade(selected_month, year);

//highlight today will not run without an active database connection
//active database connection requires a valid token

//if month of today's date is not equal to selected_month do not run this function

if(today.getMonth() == month){
  highlightToday(today);
}
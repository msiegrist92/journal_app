const back = document.getElementById('back_arrow');
const forward = document.getElementById('forward_arrow');

const monthURL = /(?<=\/)\d+(?=&)/g;
const yearURL = /(?<=&)\d{4}/g;

const monthREG = /[0-9][0-9]?/g;
const yearREG = /[0-9][0-9][0-9][0-9]/g;



const changeMonth = (direction) => {
  const current_URL = window.location.href;
  let current_month = parseInt(current_URL.match(monthREG));
  let current_year = parseInt(current_URL.match(yearREG));

  if(direction === 'forward'){
    if(current_month === 11){
      current_month = 0;
      current_year += 1;
    } else {
      current_month += 1;
    }
  }

  if(direction === 'backward') {
      if(current_month === 0){
        current_month = 11;
        current_year -= 1;
      } else {
        current_month -= 1;
      }
  }

  const redirect = '/calendar/' + current_month + '&' + current_year;
  window.location = redirect;

}

back.addEventListener('click', (e) => {
  e.preventDefault();
  changeMonth('backward');
})

forward.addEventListener('click', (e) => {
  e.preventDefault();
  changeMonth('forward');
})

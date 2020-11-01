const all_days = document.querySelectorAll('.day');
for (let day of all_days){
  if(day.textContent === ''){
    day.style.border = 'none';
  }
}

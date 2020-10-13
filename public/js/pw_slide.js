const pw_change = document.getElementById('pw_change');
const pw_form = document.getElementById('pw_form');
const pw_back = document.getElementById('back_arrow');

pw_change.addEventListener('click', (e) => {
  e.preventDefault();
  pw_form.style.left = 'calc(20% - 2rem)';
})

pw_back.addEventListener('click', (e) => {
  e.preventDefault();
  pw_form.style.left = '-3000px';
})

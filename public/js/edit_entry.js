// left: 12.5%;
// right: 12.5%;

const edit_button = document.getElementById("edit");
const edit_cont = document.getElementById('edit_cont');
const back_arrow = document.getElementById('back_arrow');
const body = document.querySelector('body');
const edit_msg = document.getElementById('edit_ok');
const hide = document.getElementById('hide_msg');
const sleep = document.getElementById('sleep');
const alert_msg = document.getElementById('alert_msg');

const fields = ['exercise', 'work', 'notes', 'sleep', 'diet', 'expenses', 'income'];

const mobile = window.matchMedia("(max-width: 500px)");


edit.addEventListener("click", (e) =>  {
  e.preventDefault();


  if(sleep.textContent.length < 1){
    edit_msg.style.display = 'block';
    window.scrollTo(0, 0);
    return alert_msg.textContent = 'No entry chosen'
  }


  if(mobile.matches){
    edit_cont.style.left = "2.5%";
    edit_cont.style.right = "2.5%";
  } else {
    edit_cont.style.left = '12.5%';
    edit_cont.style.right = '12.5%';
  }

  body.style.overflow = 'visible';

  for(let field of fields){
    let edit_field = document.getElementsByName(field)[0];
    edit_field.value = document.getElementById(field).textContent;
  }
})

edit_cont.addEventListener('submit', async (e) => {
  e.preventDefault();
  const entry = {};
  for (let field of fields){
    let val = document.getElementsByName(field)[0].value;
    entry[field] = val;
  }

  const data = JSON.stringify(entry);
  const URI_date = encodeURI(document.getElementById('date').textContent);

  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  if(document.cookie.match(REGEXP) === null){
    return alert("Token expired please log in");
  }
  const token = document.cookie.match(REGEXP)[0]

  await fetch("https://grind-check.herokuapp.com/entries/" + URI_date, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": token
    },
    body: data
}).then((response) => {
  edit_msg.style.display = 'block';
  alert_msg.textContent = 'Edit successful'
  window.scrollTo(0, 0);
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  body.style.overflow = 'hidden';
})
})

back_arrow.addEventListener('click', (e) => {
  e.preventDefault();
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  body.style.overflow = 'hidden';
})

hide_msg.addEventListener('click', (e) => {
  edit_msg.style.display = 'none';
})

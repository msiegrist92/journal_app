// left: 12.5%;
// right: 12.5%;

const edit_button = document.getElementById("edit");
const edit_cont = document.getElementById('edit_cont');
const back_arrow = document.getElementById('back_arrow');
const body = document.querySelector('body');

const fields = ['exercise', 'work', 'notes', 'sleep', 'diet', 'expenses', 'income'];

const mobile = window.matchMedia("(max-width: 500px)");


edit.addEventListener("click", (e) =>  {
  e.preventDefault();

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
  const token = document.cookie.match(REGEXP)[0]

  await fetch("/entries/" + URI_date, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": token
    },
    body: data
}).then((response));
})

back_arrow.addEventListener('click', (e) => {
  e.preventDefault();
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  body.style.overflow = 'hidden';
})

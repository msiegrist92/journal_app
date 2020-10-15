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
    edit_cont.style.display = 'block';
    setTimeout(() => {
      edit_cont.style.left = "2.5%";
      edit_cont.style.right = "2.5%";
    }, 1)
  } else {
    edit_cont.style.display = 'block';
    setTimeout(() => {
      edit_cont.style.left = "2.5%";
      edit_cont.style.right = "2.5%";
    }, 1);
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

  if(!sessionStorage.token){
    return alert("Session expired please log in");
  }

  await fetch("/entries/" + URI_date, {
    credentials: "include",
    mode: "cors",
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": sessionStorage.token
    },
    body: data
}).then(async (response) => {
  edit_msg.style.display = 'block';
  alert_msg.textContent = 'Edit successful'
  window.scrollTo(0, 0);
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  await setTimeout(() => {
    edit_cont.style.display = 'none';
  }, 1200);
})
})

back_arrow.addEventListener('click', async (e) => {
  e.preventDefault();
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  await setTimeout(() => {
    edit_cont.style.display = 'none';
  }, 1200);
})

hide_msg.addEventListener('click', (e) => {
  edit_msg.style.display = 'none';
})

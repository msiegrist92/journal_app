const edit_button = document.getElementById("edit");
const back_arrow = document.getElementById('back_arrow');
const body = document.querySelector('body');
const sleep = document.getElementById('sleep');

const fields = ['exercise', 'work', 'notes', 'sleep', 'diet', 'expenses', 'income'];

const mobile = window.matchMedia("(max-width: 500px)");


edit.addEventListener("click", (e) =>  {
  e.preventDefault();

  if(!sessionStorage.token){
    return displayMsg('Session expired please log in');
  }


  if(sleep.textContent.length < 1){
    return displayMsg('No entry chosen');
  }

  showEditForm();

  body.style.overflow = 'visible';

  //takes values of searched entry and add to edit form
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
    return displayMsg("Session expired please log in");
  }

  await entry_config.patch('/' + URI_date, data).then(async (res) => {
    displayMsg("Edit successful");
    hideEditForm();
  }).catch((err) => {
    displayMsg(err)
  })

})

back_arrow.addEventListener('click', async (e) => {
  e.preventDefault();
  hideEditForm();
})

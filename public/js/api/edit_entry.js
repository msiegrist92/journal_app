// left: 12.5%;
// right: 12.5%;

//MOVE SHOWHIDE LOGIC OF EDIT ENTRY TO SEPARATE FILE IN SHOWHIDE FOLDER

const edit_button = document.getElementById("edit");
const edit_cont = document.getElementById('edit_cont');
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
    return displayMsg("Session expired please log in");
  }

  await entry_config.patch('/' + URI_date, data).then(async (res) => {
    displayMsg("Edit successful");
    edit_cont.style.right = '-3000px';
      edit_cont.style.left = '1000px';
      await setTimeout(() => {
        edit_cont.style.display = 'none';
      }, 1200);
  }).catch((err) => {
    displayMsg(err)
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

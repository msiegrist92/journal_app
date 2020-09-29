// left: 12.5%;
// right: 12.5%;

const edit_button = document.getElementById("edit");
const edit_cont = document.getElementById('edit_cont');

const fields = ['exercise', 'work', 'notes', 'sleep', 'diet', 'expenses', 'income'];


edit.addEventListener("click", (e) =>  {
  e.preventDefault();
  edit_cont.style.left = '12.5%';
  edit_cont.style.right = '12.5%';
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

  console.log(data);

  await fetch("/entries/" + URI_date, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: data
}).then((response) => console.log(response));
})

const ids = ["sleep_lab", "sleep",
  "diet_lab", "diet",
  "exp_lab", "expenses",
  "inc_lab", "income",
  "exer_lab", "exercise",
  "work_lab", "work",
  "notes_lab", "notes",
  "submit"];

const data_els = ["sleep", "diet", "expenses", 'income', 'exercise', 'notes', 'work'];

gridAreaStyle(ids);
document.getElementById("date").textContent = formatDate(new Date().toString());

const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const entry = {};
  for(el of data_els){
    let val = document.getElementById(el).value;
    entry[el] = val;
  }


  const data = JSON.stringify(entry);

  const response = await fetch("/entries", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }).then((data) => document.getElementById("response").textContent = data.statusText);

})

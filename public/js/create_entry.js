const ids = ["sleep_lab", "sleep",
  "diet_lab", "diet",
  "exp_lab", "expenses",
  "inc_lab", "income",
  "exer_lab", "exercise",
  "work_lab", "work",
  "notes_lab", "notes",
  "submit"];
gridAreaStyle(ids);

const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let sleep = document.getElementById("sleep").value;
  let diet = document.getElementById("diet").value;
  let expenses = document.getElementById("expenses").value;
  let income = document.getElementById("income").value;
  let exercise = document.getElementById("exercise").value;
  let notes = document.getElementById("notes").value;
  let work = document.getElementById('work').value;

  const entry = {
    sleep,
    diet,
    expenses,
    income,
    exercise,
    notes,
    work
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

const ids = ["sleep_lab", "sleep",
  "date_lab", "date",
  "diet_lab", "diet",
  "exp_lab", "expenses",
  "inc_lab", "income",
  "exer_lab", "exercise",
  "work_lab", "work",
  "notes_lab", "notes",
  "submit", "response"];

const data_els = ['date', "sleep", "diet", "expenses", 'income', 'exercise', 'notes', 'work'];

gridAreaStyle(ids);
document.getElementById("date").value = formatTommddyy(formatDate(new Date().toString()));

const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const entry = {};
  for(el of data_els){
    let val = document.getElementById(el).value;
    entry[el] = val;
  }

  if(!verifyFormat(entry.date)){
    return document.getElementById('response').textContent = "incorrect date format - use mm/dd/yy";
  } else {
    entry.date = mmddyyToStr(entry.date);

    const data = JSON.stringify(entry);

    const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
    const token = document.cookie.match(REGEXP)[0]

    const response = await fetch("/entries", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: data
    }).then((data) => document.getElementById("response").textContent = data.statusText);
  }
})

console.log(document.cookie);

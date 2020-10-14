const data_els = ['date', "sleep", "diet", "expenses", 'income', 'exercise', 'notes', 'work'];

const ok_msg = document.getElementById('create_ok');
const alert_msg = document.getElementById('alert_msg');

const hide = document.getElementById('hide_msg');


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
    ok_msg.style.display = 'block';
    window.scrollTo(0, 0);
    return alert_msg.textContent = 'Invalid date format - use mm/dd/yy'
  } else {

    const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
    if(document.cookie.match(REGEXP) === null){
      return alert("Token expired please log in");
    }

    const token = document.cookie.match(REGEXP)[0]

    entry.date = mmddyyToStr(entry.date);

    //search /months api route to check if entry already exists

    const month = getMonth(entry.date);

    let found = false;

    await fetch("https://grind-check.herokuapp.com/entries/months/" + month, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": token
      }
    }).then((data) => {
      return data.json()
    }).then((entries) => {
      for(let prev_entry of entries){
        if(prev_entry.date === entry.date){
          return found = true;
        }
      }
    })

    if(found === true){
      ok_msg.style.display = 'block';
      window.scrollTo(0, 0);
      return alert_msg.textContent = 'Entry already exists'
    } else {
      const data = JSON.stringify(entry);

      await fetch("https://grind-check.herokuapp.com/entries", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        body: data
      }).then((data) => {
        ok_msg.style.display = 'block';
        alert_msg.textContent = 'Entry created'
        window.scrollTo(0, 0);
      })
    }

  }
})

hide_msg.addEventListener('click', (e) => {
  e.preventDefault();
  ok_msg.style.display = 'none';
})

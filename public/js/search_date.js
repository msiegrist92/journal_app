const grid_areas = ['date_inp', 'submit', 'date', 'entry_cont', 'form'];
gridAreaStyle(grid_areas);

const data_els = ['date', 'sleep', 'diet', 'expenses', 'income', 'exercise', 'work',
  'notes'];


//submit button retrieves date and formats it to correct URI encoding
//then makes get request and displays data - calls entries

const getEntries = async (date) => {

  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  if(document.cookie.match(REGEXP) === null){
    return alert("Token expired please log in");
  }
  const token = document.cookie.match(REGEXP)[0]

  let uri_date = encodeURI(date)
  await fetch('/entries/' + uri_date, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": token
    },
  }).then((data) => {
    return data.json()
  }).then((json) => {


    for(el of data_els){
      document.getElementById(el).textContent = json[0][el];
    }

  }).catch((err) => {
    document.getElementById('date').textContent = 'No entry found for ' + date;
})
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let date = document.getElementById('date_inp').value;
  if (verifyFormat(date)){
    const str_date = mmddyyToStr(date);
    getEntries(str_date);
  } else {
    document.getElementById("date").textContent = "invalid date format";
  }
})

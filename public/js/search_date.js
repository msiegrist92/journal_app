const data_els = ['date', 'diet', 'exercise', 'expenses', 'income',
  'notes', 'sleep', 'work'];


//submit button retrieves date and formats it to correct URI encoding
//then makes get request and displays data - calls entries

const getEntries = async (date) => {
  let uri_date = encodeURI(date)
  await fetch('/entries/' + uri_date, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((data) => {
    return data.json()
  }).then((json) => {


    for(el of data_els){
      document.getElementById(el).textContent = json[0][el];
    }

    console.log(json)
  }).catch((err) => {
    document.getElementById('date').textContent = 'no entry found for ' + date;
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

console.log(verifyFormat('09/20/123401'));

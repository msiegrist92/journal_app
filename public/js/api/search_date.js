const data_els = ['date', 'sleep', 'diet', 'expenses', 'income', 'exercise', 'work',
  'notes'];


//submit button retrieves date and formats it to correct URI encoding
//then makes get request and displays data - calls entries

const getEntries = async (date) => {

  if(!sessionStorage.token){
    return displayMsg('Session expired please log in');
  }

  let uri_date = encodeURI(date)

  await entry_config.get('/' + uri_date).then((res) => {
    if(res.data[0] === undefined){
      return displayMsg("No entry found for " + date);
    }
    for(let el of data_els){
      document.getElementById(el).textContent = res.data[0][el];
    }
  }).catch((err) => {
    console.log(err)
    return displayMsg('Internal server error please try again later');
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
    return displayMsg('Invalid date format');
  }
})

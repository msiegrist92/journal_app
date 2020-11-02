const data_els = ['date', "sleep", "diet", "expenses", 'income', 'exercise', 'notes', 'work'];

document.getElementById("date").value = formatTommddyy(formatDate(new Date().toString()));

const form = document.querySelector('form');

loadMostRecent();
const prev = JSON.parse(sessionStorage.previous);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const entry = {};
  for(el of data_els){
    let val = document.getElementById(el).value;
    entry[el] = val;
  }

  if(!verifyFormat(entry.date)){
    return displayMsg('Invalid date format - use mm/dd/yy');
  } else {

    if(!sessionStorage.token){
      return displayMsg('Session expired please log in');
    }

    entry.date = mmddyyToStr(entry.date);

    const month = getMonth(entry.date);
    let found = false;

    //search /months api route to check if entry already exists
    await entry_config.get('/months/' + month).then((res) => {
      let entries = res.data;
      for(let prev_entry of entries){
        if(prev_entry.date === entry.date){
          return found = true;
        }
      }
    })

    if(found === true){
      return displayMsg('Entry already exists');
    } else {
      const data = JSON.stringify(entry);

      await entry_config.post('', data).then((res) => {
        if(sessionStorage.previous === 'null'){
          return displayMsg("Welcome! Whenever you make a new entry we'll let you know how you're doing!")
        } else {
          return displayMsg(compareMessage(prev));
        }
      }).catch((err) => {
        return displayMsg(err);
      })
    }
  }
})

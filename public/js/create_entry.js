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

    //search /months api route to check if entry already exists

    const month = getMonth(entry.date);

    let found = false;


    //checking database through months === input month for duplicate entry
    await fetch("/entries/months/" + month, {
      credentials: "include",
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": sessionStorage.token
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
      return displayMsg('Entry already exists');
    }
    //if pass all checks - create entry in database
    else {
      const data = JSON.stringify(entry);

      await fetch("/entries", {
        credentials: "include",
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": sessionStorage.token
        },
        body: data
      }).then((data) => {


        if(sessionStorage.previous === 'null'){
          return displayMsg('Welcome! When your newest entry has lower sleep or diet values we will let you know!');
        }

        //function compareMessage compares values in form to values of most previous Entry
        else {
          // return displayMsg(compareMessage());
          return displayMsg(compareMessage(prev));
        }
      })
    }

  }
})

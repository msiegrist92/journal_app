const btns = ["work_btn", "exer_btn", "gen_btn", "num_lab", 'num', 'go'];

const table_elements = ["sleep", "diet", "expenses", "income"];

const note_btns = ["work_btn", "exer_btn", "gen_btn"];

const date_btns = ["btn_1", "btn_2", "btn_3"];

const go_btn = document.getElementById('go');

const getRecents = (amount) => {
  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  if(document.cookie.match(REGEXP) === null){
    return alert("Token expired please log in");
  }
  const token = document.cookie.match(REGEXP)[0]

  return fetch('https://grind-check.herokuapp.com/entries/recents/' + amount, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  .then((response) => {
    return response.json();
  }).then((entries) => entries
)}

const displayDates = entries => {
  for (let i=0; i < entries.length; i++){
    if(entries[i].date === null){
      document.getElementById(date_btns[i].textContent = '');
    } else {
    document.getElementById(date_btns[i]).textContent = entries[i].date;
    }
  }
}

const displayTableData = (index, entries) => {
  let entry = entries[index];
  for(data of table_elements){
    document.getElementById(data).textContent = entry[data];
  }
}

const getDateIndex = (entries, date) => {
  for(let entry of entries){
    if(entry.date === date){
      return entries.indexOf(entry);
    }
  }
}

const changeNotes = (entries, button, index) => {
  let selection = document.getElementById(button).textContent;
  selection = selection.toLowerCase();
  let notes = entries[index][selection];
  document.getElementById("notes_display").textContent = notes;
}

const toggleButtonSelected = (buttons, button_el, class_name) => {
  for (button of buttons){
    let element = document.getElementById(button);
    if(element.classList.contains(class_name)){
      element.classList.toggle(class_name)
    }
  }
  document.getElementById(button_el).classList.toggle(class_name);
}

const checkDate = (date_buttons) => {
  for (button of date_buttons){
    let element = document.getElementById(button);
    if(element.classList.contains('date_selected')){
      return element.textContent;
    }
  }
}

const checkNotes = (note_buttons) => {
  for (button of note_buttons){
    let element = document.getElementById(button);
    if (element.classList.contains('notes_selected')){
      return button;
    }
  }
}

const noteButtonController = note_btn => {
  document.getElementById(note_btn).addEventListener('click', (e) => {
    e.preventDefault();
    let entries = JSON.parse(sessionStorage.entries);

    toggleButtonSelected(note_btns, note_btn, 'notes_selected')

    let date_index = getDateIndex(entries, checkDate(date_btns));
    changeNotes(entries, note_btn, date_index);
  })
}

const dateButtonController = btn_el => {
  document.getElementById(btn_el).addEventListener('click', (e) => {
    e.preventDefault();
    let entries = JSON.parse(sessionStorage.entries)

    toggleButtonSelected(date_btns, btn_el, 'date_selected');

    let date_index = getDateIndex(entries, checkDate(date_btns));
    displayTableData(date_index, entries);

    let note_selected = checkNotes(note_btns);
    changeNotes(entries, note_selected, date_index);
  })
}

const establishDefaultState = (amount) => {
  getRecents(amount).then(response => {
    for(let entry of response){
      if(entry === null){
        let index = response.indexOf(entry);
        response.length = index;
      }
    }
    displayDates(response)
    displayTableData(0, response)
    changeNotes(response, 'gen_btn', 0);
    sessionStorage.setItem('entries', JSON.stringify(response));
  })
}

const setButtonWidth = length => {
  if(length === 4){
    for(let i = 0; i < date_btns.length; i++){
      let element = document.getElementById(date_btns[i]);
      element.style.width = '85%';
      }
    }
    else if (length === 5) {
      for(let i = 0; i < date_btns.length; i++){
        let element = document.getElementById(date_btns[i]);
        element.style.width = '95%';
      }
    }

    else {
      for(let i = 0; i < date_btns.length; i++){
        let element = document.getElementById(date_btns[i]);
        element.style.width = '75%';
      }
    }
    if(length === 5 && mobile_recents.matches){
      document.getElementById('btn_5').style.width = '40%';
    }

}

for (let i = 0; i < note_btns.length; i++){
  noteButtonController(note_btns[i]);
}


go_btn.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = document.getElementById('num').value;

  if(amount == 4){
    date_btns.push('btn_4');
    addDateButtonDOM('btn_4')
  } else if (amount == 5) {
    date_btns.push('btn_4', 'btn_5');
    addDateButtonDOM('btn_4')
    addDateButtonDOM('btn_5')
  }
  formatDateGrid(amount);

  for (let i = 0; i < date_btns.length; i++){
    dateButtonController(date_btns[i]);
  }

  go_btn.setAttribute('disabled', 'disabled');
  setButtonWidth(date_btns.length);
  establishDefaultState(amount);
})

const btns = ['btn_1', 'btn_2', 'btn_3', "work_btn", "exer_btn", "gen_btn"];
gridAreaStyle(btns);

const table_elements = ["sleep", "diet", "expenses", "income"];

const note_btns = ["work_btn", "exer_btn", "gen_btn"];

const date_btns = ["btn_1", "btn_2", "btn_3"];

const getRecents = () => {
  return fetch('entries/recents/3')
  .then((response) => {
    return response.json();
  }).then((entries) => entries
)}

const displayDates = entries => {
  for (i=0; i < entries.length; i++){
    document.getElementById(date_btns[i]).textContent = entries[i].date;
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

document.getElementById('work_btn').addEventListener('click', (e) => {
  e.preventDefault();
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    changeNotes(response, 'work_btn', date_index);
  })
  toggleButtonSelected(note_btns, "work_btn", 'notes_selected')
})

document.getElementById('exer_btn').addEventListener('click', (e) => {
  e.preventDefault();
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    changeNotes(response, 'exer_btn', date_index);
  })
  toggleButtonSelected(note_btns, 'exer_btn', 'notes_selected');
})

document.getElementById('gen_btn').addEventListener('click', (e) => {
  e.preventDefault();
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    changeNotes(response, 'gen_btn', date_index);
  })
  toggleButtonSelected(note_btns, "gen_btn", "notes_selected");
})

//on selecting date buttons
//toggle selected class
//display data for the date selected
//retain note selection when updating data
document.getElementById('btn_1').addEventListener('click', (e) => {
  e.preventDefault();
  toggleButtonSelected(date_btns, 'btn_1', 'date_selected');
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    displayTableData(date_index, response);
    let note_selected = checkNotes(note_btns);
    changeNotes(response, note_selected, date_index);
  })
})

document.getElementById('btn_2').addEventListener('click', (e) => {
  e.preventDefault();
  toggleButtonSelected(date_btns, 'btn_2', 'date_selected');
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    displayTableData(date_index, response);
    let note_selected = checkNotes(note_btns);
    changeNotes(response, note_selected, date_index);
  })
})

document.getElementById('btn_3').addEventListener('click', (e) => {
  e.preventDefault();
  toggleButtonSelected(date_btns, 'btn_3', 'date_selected');
  getRecents().then(response => {
    let date_index = getDateIndex(response, checkDate(date_btns));
    displayTableData(date_index, response);
    let note_selected = checkNotes(note_btns);
    changeNotes(response, note_selected, date_index);
  })
})




//application default state - general notes displayed and most recent journal entry is loaded into table
getRecents().then(response => {
    displayDates(response)
    displayTableData(0, response)
    changeNotes(response, 'gen_btn', 0);
  console.log(response)})

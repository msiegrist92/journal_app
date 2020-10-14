const addDateButtonDOM = id => {
  const btn_cont = document.getElementById('btn_cont');
  let button = document.createElement('button');
  button.setAttribute('id', id);
  button.setAttribute('class', 'date_btn');
  btn_cont.appendChild(button);
}

const mobile_recents = window.matchMedia('(max-width: 550px)');

const formatDateGrid = amount => {


  const btn_cont = document.getElementById('btn_cont');

  if (amount == 3){
    return
  }

  if (amount == 4 && !mobile_recents.matches){
    btn_cont.style.gridTemplateColumns = "repeat(4, 1fr)";
    btn_cont.style.gridTemplateAreas = "btn_1 btn_2 btn_3 btn_4";

  }

  if(amount == 5 && !mobile_recents.matches) {
    btn_cont.style.gridTemplateColumns = "repeat(5, 1fr)";
    btn_cont.style.gridTemplateAreas = "btn_1 btn_2 btn_3 btn_4 btn_5";

  }

  if(amount == 4 && mobile_recents.matches){
    btn_cont.style.gridTemplateColumns = "repeat(2, 1fr)";
    btn_cont.style.gridTemplateRows = "repeat(3, auto)";
    btn_cont.style.gridTemplateAreas = `"btn_1 btn_2"
    "btn_3 btn_4"
    "btn_5 btn_5"`;
  }

  else if(amount == 5 && mobile_recents.matches){

    btn_cont.style.gridTemplateColumns = "repeat(2, 1fr)";
    btn_cont.style.gridTemplateRows = "repeat(3, auto)";
    btn_cont.style.gridTemplateAreas = `"btn_1 btn_2"
    "btn_3 btn_4"
    "btn_5 btn_5"`;

    document.getElementById('btn_5').style.gridColumn = '1 / 3';
  }

}

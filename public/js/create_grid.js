const gridAreaStyle = elements => {
  for (element of elements){
    document.getElementById(element).style.gridArea = element;
  }
}

const addDateButtonDOM = id => {
  const btn_cont = document.getElementById('btn_cont');
  let button = document.createElement('button');
  button.setAttribute('id', id);
  button.setAttribute('class', 'date_btn');
  btn_cont.appendChild(button);
}

const formatDateGrid = amount => {
  const btn_cont = document.getElementById('btn_cont');
  if (amount == 3){
    return
  } else if (amount == 4){
    btn_cont.style.gridTemplateColumns = "repeat(4, 1fr)";
    btn_cont.style.gridTemplateAreas = "btn_1 btn_2 btn_3 btn_4";

    addDateButtonDOM('btn_4');
  } else {
    btn_cont.style.gridTemplateColumns = "repeat(5, 1fr)";
    btn_cont.style.gridTemplateAreas = "btn_1 btn_2 btn_3 btn_4 btn_5";

    addDateButtonDOM('btn_4');
    addDateButtonDOM('btn_5');
  }
}

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

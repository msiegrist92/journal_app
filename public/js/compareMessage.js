const compareMessage = (prev) => {

  const form_s = document.getElementById('sleep').value;
  const form_d = document.getElementById('diet').value;


  const prev_s = prev.sleep;
  const prev_d = prev.diet;


  if(form_s < prev_s && form_d >= prev_d){
    return 'Work on improving your sleep quality!';
  }

  if(form_d < prev_d && form_s >= prev_s){
    return 'You are what you eat. We recommend broccoli.'
  }

  if(form_d < prev_d && form_s < prev_s){
    return "Not your best. Eat and sleep better to improve your days"
  }

  if((form_d >= prev_d && form_s >= prev_s) ||
      (form_d == prev_d && form_s == prev_s)){
        return "You're on the right track - keep it up!"
      }
}

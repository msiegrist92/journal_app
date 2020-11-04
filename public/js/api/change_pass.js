const form = document.getElementById('pw_form');
const response_el = document.getElementById("response");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const old_pw = document.getElementsByName('old_pw')[0].value;
  const new_pw = document.getElementsByName('new_pw')[0].value;
  const new_match = document.getElementsByName('new_match')[0].value;


  if(new_pw.length < 6){
    return response_el.textContent = "Password must be longer than 6 chars"
  }

  //compare new passwords to  match
  if(new_pw != new_match){
    return response_el.textContent = 'Passwords do not match'
  }



  if(!sessionStorage.token){
    return displayMsg("Session expired please log in");
  }

  const passwords = JSON.stringify({
    old_pw,
    new_pw
  })

  await user_auth_config.patch('me', {
    data: passwords
  }).then((res) => {
    return displayMsg('Password changed')
  }).catch((err) => {
    return displayMsg(err);
  })


})

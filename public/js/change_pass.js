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



  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  const token = document.cookie.match(REGEXP)[0]

  const passwords = JSON.stringify({
    old_pw,
    new_pw
  })

  const response = await fetch('/user/me', {
    method: 'PATCH',
    headers : {
      'Content-Type': 'application/json',
      "Authorization": token
    },
    body: passwords

  }).then((response) => {
    if(response.status === 401){
      response_el.textContent = 'Invalid password'
    }
    if(response.status === 200){
      response_el.textContent = 'Password changed'
    }
    if(response.status === 500){
      response_el.textContent = 'Server error, please try again later'
    }
  })



  //if above {changepass and return 201}
})

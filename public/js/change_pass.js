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

  const response = await fetch('/user/me', {
    credentials: "include",
    mode: "cors",
    method: 'PATCH',
    headers : {
      'Content-Type': 'application/json',
      "Authorization": sessionStorage.token
    },
    body: passwords

  }).then((response) => {
    if(response.status === 401){
      return displayMsg('Invalid password')
    }
    if(response.status === 200){
      return displayMsg('Password changed')
    }
    if(response.status === 500){
      return displayMsg('Internal servor error try again later')
    }
  })


})

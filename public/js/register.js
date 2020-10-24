const register_form = document.querySelector('form');

register_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if(document.getElementsByName('password')[0].value.length < 6){
    return displayMsg('Password must be six characters');
  }

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })

  await fetch('/user', {
    credentials: "include",
    mode: "cors",
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: data
  }).then((response) => {
    if(response.status === 400){
      return displayMsg('Email already in use');
    }
    if(response.status === 503){
      return displayMsg('Internal server error please try again later');
    }

    return response.json()
  }).then((json) => {
    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = 'token=' + json.token.token;
    sessionStorage.setItem('token', json.token.token);
    displayMsg('Account created');
    setTimeout(() => window.location = "/help", 2500)
  })
})

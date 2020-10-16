const form = document.querySelector('form');

displayMsg('Accounts created on 10/15 will need to be recreated due to a database error')
;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })


  await fetch('/user/login', {
    credentials: "include",
    mode: "cors",
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body : data
  }).then((response) => {
    if (response.status === 500){
      return displayMsg('Incorrect email or password');
    } else {
      return response.json()
  }
  }).then((json) => {
    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = 'token=' + json.token.token;
    sessionStorage.setItem('token', json.token.token);
    window.location = "/create"
  })
})

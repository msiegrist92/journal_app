const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })


  await fetch ('/user/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body : data
  }).then((response) => {
    if (response.status === 500){
      return alert('Incorrect email or password');
    } else {
    return response.json()
  }
  }).then((json) => {

    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = "token=" + json.token + ';expires=' + to_expire;
    window.location = "/create"
  })
})

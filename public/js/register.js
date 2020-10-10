const register_form = document.querySelector('form');

register_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if(document.getElementsByName('password')[0].value.length < 6){
    return alert('Password must be at least six characters')
  }

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })
  await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: data
  }).then((response) => {
    if(response.status === 400){
      return alert('email already in use');
    }
    return response.json()
  }).then((json) => {
    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = "token=" + json.token + ';expires=' + to_expire;
    window.location = "/create"
  })
})

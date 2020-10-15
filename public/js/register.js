const register_form = document.querySelector('form');

const ok_msg = document.getElementById('create_ok');
const alert_msg = document.getElementById('alert_msg');
const hide_msg = document.getElementById('hide_msg');

hide_msg.addEventListener('click', (e) => {
  ok_msg.style.display = 'none';
})


register_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if(document.getElementsByName('password')[0].value.length < 6){
    ok_msg.style.display = 'block';
    window.scrollTo(0, 0);
    return alert_msg.textContent = 'Password must be six characters';

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
      ok_msg.style.display = 'block';
      window.scrollTo(0, 0);
      return alert_msg.textContent = 'Email already in use';
    }
    return response.json()
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

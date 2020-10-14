const form = document.querySelector('form');

const ok_msg = document.getElementById('create_ok');
const alert_msg = document.getElementById('alert_msg');
const hide_msg = document.getElementById('hide_msg');
const message = document.getElementById('message');

hide_msg.addEventListener('click', (e) => {
  ok_msg.style.display = 'none';
})


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })

  message.textContent = 'this far';

  fetch('https://grind-check.herokuapp.com/user/login', {
    credentials: "include",
    mode: "cors",
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body : data
  }).then((response) => {
    if (response.status === 500){
      ok_msg.style.display = 'block';
      window.scrollTo(0, 0);
      return alert_msg.textContent = 'Incorrect email or password';
    } else {
      message.textContent = 'in fetch';
    return response.json()
  }
  }).then((json) => {
    message.textContent = 'final then';
    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = "token=" + json.token.token + ';expires=' + to_expire;
    window.location = "https://grind-check.herokuapp.com/create"
  })
  message.textContent = 'below fetch';
})

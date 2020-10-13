const form = document.querySelector('form');

const ok_msg = document.getElementById('create_ok');
const alert_msg = document.getElementById('alert_msg');
const hide = document.getElementById('hide_msg');

hide_msg.addEventListener('click', (e) => {
  ok_msg.style.display = 'none';
})


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
      ok_msg.style.display = 'block';
      window.scrollTo(0, 0);
      return alert_msg.textContent = 'Incorrect email or password';
    } else {
    return response.json()
  }
  }).then((json) => {

    const now = new Date().getTime();
    let to_expire = now + 1800000;
    to_expire = new Date(to_expire);
    to_expire = to_expire.toGMTString();
    document.cookie = "token=" + json.token.token + ';expires=' + to_expire;
    window.location = "/create"
  })
})
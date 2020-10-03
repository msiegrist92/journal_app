const register_form = document.querySelector('form');

register_form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })
  console.log(data)
  await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: data
  }).then((response) => {
    return response.json()
  }).then((json) => {
    console.log(json);
    document.cookie = 'token=' + json.token;
    window.location ="/create"
  })
})

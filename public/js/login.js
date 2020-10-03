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
  }).then((response) => { return response.json()
  }).then((json) => {
    document.cookie = "token=" + json.token;
    window.location = "/create"
  })
})

const form = document.querySelector('form');

displayMsg('Accounts created on 10/15 will need to be recreated due to a database error')
;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = JSON.stringify({
    email: document.getElementsByName('email')[0].value,
    password: document.getElementsByName('password')[0].value
  })

  user_config.post('/login', data).then(({data} = res) => {

    document.cookie = 'token=' + data.token.token;
    sessionStorage.setItem('token', data.token.token);
    window.location = '/create';

  }).catch((err) => {
    if(err.response.status === 500){
      return displayMsg('Invalid email or password');
    } else {
      return displayMsg(err);
    }
  })

})

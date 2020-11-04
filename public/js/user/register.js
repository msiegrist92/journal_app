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

  await user_config.post('', data).then(({data} = res) => {
    document.cookie = 'token=' + data.token.token;
    sessionStorage.setItem('token', data.token.token);
    window.location = '/help'

  }).catch(({response} = err) => {
    if(response.status === 400){
      return displayMsg('Email already in use');
    } else {
      return displayMsg('Internal server error please try again later');
    }
  })
})

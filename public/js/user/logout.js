const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
  e.preventDefault();

  if(!sessionStorage.token){
    return window.location = '/';
  }

  await user_auth_config.post('/logout').then((res) => {
    sessionStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem('previous');
    displayMsg('Logged out');
    setTimeout(() => window.location = '/', 1800);
  }).catch((err) => {
    return displayMsg(err.response.data);
  })

})

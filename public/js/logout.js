const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
  e.preventDefault();
  if(!sessionStorage.token){
    return window.location = '/';
  }
  await fetch('/user/logout', {
    credentials: "include",
    mode: "cors",
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.token
    }
  }).then((response) => {
    sessionStorage.removeItem('token');
    alert('token deleted');
    window.location = "/"
  })
})

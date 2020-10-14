const deleteCookie = name => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const logout = document.getElementById('logout');
logout.textContent = 'geronimo';

logout.addEventListener('click', async (e) => {
  alert('what in the fuck');
  alert(document.cookie);
  e.preventDefault();
  alert(document.cookie);
  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  if(document.cookie.match(REGEXP) === null){
    return window.location = '/';
  }
  const token = document.cookie.match(REGEXP)[0]
  alert(token);
  await fetch('/user/logout', {
    credentials: "include",
    mode: "cors",
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }).then((response) => {
    deleteCookie('token');
    alert('cookie deleted');
    window.location = "/"
  })
})

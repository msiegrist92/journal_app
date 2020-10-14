const deleteCookie = name => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


document.getElementById('logout').addEventListener('click', async (e) => {
  e.preventDefault();
  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  if(document.cookie.match(REGEXP) === null){
    return window.location = '/';
  }
  const token = document.cookie.match(REGEXP)[0]
  await fetch('http://grind-check.herokuapp.com/user/logout', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }).then((response) => {
    deleteCookie('token');
    window.location = "http://grind-check.herokuapp.com/"
  })
})

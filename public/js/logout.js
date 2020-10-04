console.log('loaded')

document.getElementById('logout').addEventListener('click', async (e) => {
  console.log('event')
  e.preventDefault();
  const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/
  const token = document.cookie.match(REGEXP)[0]
  console.log(token);
  await fetch('user/logout', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }).then((response) => {
    console.log(response);
    window.location = "/index"
  })
})

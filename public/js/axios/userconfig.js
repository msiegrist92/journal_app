//base url /user post
// /login post
// /logout post
// /me get patch delete
//delete user is not used until incorporate functionality client side

const user_auth_config = axios.create({
  baseURL: '/user',
  headers: {
    'Content-Type': "application/json",
    "Authorization" : sessionStorage.token
  }
})

const user_config = axios.create({
  baseURL: '/user',
  headers: {
    'Content-Type': 'application/json'
  }
})

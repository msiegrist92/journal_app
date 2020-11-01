

//baseurl /entries get patch post
// /recents get
// /months get
// /date get patch

//default method get
const entry_config = axios.create({
  baseURL: '/entries',
  headers: {
    'Content-Type': "application/json",
    'Authorization': sessionStorage.token
  }
})

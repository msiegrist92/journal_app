//sessionStorage.setItem('previous', entry);

const loadMostRecent = async () => {
  await fetch("/entries/recents/1", {
    credentials: 'include',
    mode: "cors",
    methods: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.token
    }
  }).then((data) => {
    return data.json()
  }).then((entry) => {
    const recent = JSON.stringify(entry[0]);
    sessionStorage.setItem('previous', recent);
  })

}

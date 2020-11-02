//sessionStorage.setItem('previous', entry);

const loadMostRecent = async () => {

  await entry_config.get('/recents/1').then((res) => {
    sessionStorage.setItem('previous', JSON.stringify(res.data[0]));
  }).catch((err) => {
    displayMsg(err);
  })

}

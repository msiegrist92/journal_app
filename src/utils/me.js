const axios = require('axios');
const date_regex = require('./date_regex.js');
const months_objs = require('./months_objs.js');

const getSortedDates = entries => {
  const dates = [];
  for (let entry of entries){

    let abbr_month = date_regex.getMonth(entry.date);
    let month_index;

    for(let month of months_objs.months){
      if(abbr_month === month.abbr){
        month_index = month.index;
      }
    }

    let year = date_regex.getYear(entry.date);
    let date = date_regex.getDate(entry.date);
    dates.push(new Date(year, month_index, date));
  }

  dates.sort((a, b) => {
    return a - b;
  });

  return dates;
}

const calcConsistency = (first_ms, recent_ms, entries) => {
  const difference = recent_ms - first_ms;
  const days_difference = difference /  86400000 + 1;

  const num_entries = entries.length;

  const consistency = (num_entries / days_difference) * 100

  if(consistency < 1){
    return Math.trunc((consistency * 100)) / 100
  } else {
    return Math.floor((consistency * 100) / 100)
  }


}

const getUserStats = (dates, entries) => {

  //error handling for dates, entries being empty

  if(entries.length === 0 || dates.length === 0){
    return stats = {
      recent: 'No entries made',
      first: "No entries made",
      consistency: 0
    }
  }


  const recent_e = dates[dates.length - 1];
  const first_e = dates[0];

  const first_ms = first_e.getTime();

  const today_ms = new Date().setHours(0,0,0,0);

  const difference = today_ms - first_ms;
  const days_difference = difference / 86400000 + 1;

  const num_entries = entries.length;

  const consistency = calcConsistency(first_ms, today_ms, entries)

  return stats = {
    recent : date_regex.formatDate(recent_e.toString()),
    first : date_regex.formatDate(first_e.toString()),
    consistency
  }

}

//create render retrieves user data upon request and sends object to hbs for rendering
const createRender = async (token, hostname) => {

  const port = process.env.PORT || 2800;

  //on dev server add port after hostname
  //on production remove : and  port
  //this needs to be changed to be a string literal
  //alternatively - if (hostname === regex){use string literal format x}
  const uri = 'http://' + hostname + ':' + port +  '/user';

  const user_auth_config = axios.create({
    baseURL: uri,
    headers: {
      'Content-Type': "application/json",
      "Authorization" : token
    }
  })

  //refactor to axios
  return await user_auth_config.get('/me').then((res) => {

    const stats = getUserStats(getSortedDates(res.data.entries), res.data.entries);
    let { recent, first, consistency } = stats;
    consistency += '%'

    const to_render = {
      recent,
      first,
      consistency,
      email: res.data.user.email
    }

    return to_render;

  }).catch((err) => {
    console.log(err);
  })

}

module.exports = {
  createRender: createRender
}

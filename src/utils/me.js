//dates need to be sorted by date in case user has created back log of populate_entries
//if user wants to create an entry for 4 years ago to tank their consistency or whatever than that is just what will happen

const date_regex = require('./date_regex.js');
const months_objs = require('./months_objs.js');
const rp = require('request-promise');

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

const createRender = (token, hostname) => {

  const port = process.env.PORT || 2800;
  const uri = 'http://' + hostname + ':' + port + '/user/me';

  return rp({
    uri,
    headers: {
      "Content-Type": "application/json",
      "Authorization" : token
    },
    json: true
  }).then((response) => {
      const to_render = {};
    const stats = getUserStats(getSortedDates(response.entries),            response.entries);
    to_render.recent = stats.recent;
    to_render.first = stats.first;
    to_render.consistency = stats.consistency + '%';
    to_render.email = response.user.email;
    return to_render;
  })
}

module.exports = {
  createRender: createRender
}

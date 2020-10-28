const months_objs = require('./months_objs.js');

//function which returns an object that will render a calendar for the month


//month is zero-indexed month
const createCal = (month, year) => {

  const today = new Date();
  //number of days in month
  const month_length = months_objs.months[month].days;

  //finds the day of the week the month starts on
  const first_of = new Date(year, month, 1);
  const first_of_day = months_objs.days[first_of.getDay()];


  let to_render = {};
  for(let i = 1; i <= month_length; i++){
    let day = months_objs.days[new Date(year, month, i).getDay()];
    day = day.substring(0, 3);
    let date = '';
    if(i < 10){
      date = '0' + i.toString();
    } else {
      date = i.toString();
    }
    to_render[i] = `${date}\n${day}`;
  };
  to_render.option_1 = "Create"
  to_render.option_2 = "Calendar"
  to_render.option_3 = "Recents"
  to_render.option_4 = "Search",
  to_render.option_5 = 'Account'
  to_render.option_6 = "Log Out"
  to_render.link_1 = '/create'
  to_render.link_2 = '/calendar'
  to_render.link_3 = '/recent'
  to_render.link_4 = '/search'
  to_render.link_5 = '/me'
  to_render.month = months_objs.months[month].name;

  return to_render;
}

module.exports = {
  createCal: createCal
};

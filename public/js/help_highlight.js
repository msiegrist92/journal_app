//search through text of second #help_text for the words
//'yellow' and 'green'
//enclose the words in <b> tags and highlight them according to color
//this script adds the b tags and the highighting is handled in css

const cal_entry = document.querySelectorAll('.help_text')[1];
const start_text = cal_entry.textContent;

const addBTags = (text_content, search_word) => {
  let word_length = search_word.length + 3;
  let start_index = text_content.search(search_word);
  let start_tags = text_content.slice(0, start_index) + '<b>' + text_content.slice(start_index);
  let end_tags = start_tags.slice(0, (start_index + word_length)) + '</b>' + start_tags.slice(start_index + word_length);
  return end_tags;
}

//set innerHTML to apply styling of b tags

const add_yellow = addBTags(start_text, 'yellow');
const add_green = addBTags(add_yellow, 'green');


cal_entry.innerHTML = add_green;

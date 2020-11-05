const edit_cont = document.getElementById('edit_cont');


//do we need to reset body overflow on hide form?
//with certain screen sizes?
const hideEditForm = async () => {
  edit_cont.style.right = '-3000px';
  edit_cont.style.left = '1000px';
  await setTimeout(() => {
    edit_cont.style.display = 'none';
  }, 1200);
}

const showEditForm = () => {
  edit_cont.style.display = 'block';
  setTimeout(() => {
    edit_cont.style.left = "2.5%";
    edit_cont.style.right = "2.5%";
  }, 1200)
}

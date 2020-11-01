const nav_drop = () => {
  let active = document.getElementById("active");
  let inactive = document.getElementById("inactive");
  let drop = document.getElementById('dropdown');

  if(active.style.display === 'none'){
    return displayMenu(drop)
  } else {
    return hideMenu(drop);
  }
}

const displayMenu = drop => {
  active.style.display = 'block';
  inactive.style.display = 'none';
  drop.style.top = '60px';
}

const hideMenu = drop => {
  inactive.style.display = 'block';
  active.style.display = 'none';
  drop.style.top = '-500px';
}

const buttons = document.querySelectorAll('.nav_img');

for (let button of buttons){
  button.addEventListener("click", (e) => {
    e.preventDefault();
    nav_drop();
  })
}

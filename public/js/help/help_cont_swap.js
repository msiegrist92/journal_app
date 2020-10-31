const containers = document.querySelectorAll('.help_cont');
const first_break = window.matchMedia('(max-width: 1000px)');
const second_break = window.matchMedia('(max-width: 750px)');


const reorderElements = (container) => {
  let image = container.querySelector('.help_img');
  let p = container.querySelector('.help_text');

  image = container.insertBefore(image, p);
  //elements are reorder now add inline styles
  imgFirstStyle(image, p);

}


const imgFirstStyle = (img, p) => {
  //if statements for media queries
  if(first_break.matches){
    img.style.gridColumn = '1 / 3';
    p.style.gridColumn = '3 / 5';
  }
  if(second_break.matches){
    img.style.gridColumn = 'auto';
    p.style.gridColumn = 'auto';
  }
  else {
    img.style.gridColumn = '1 / 2';
    p.style.gridColumn = '2 / 5';
  }
}


for(let i = 0; i < containers.length; i++){
  if(i % 2 === 0){
    reorderElements(containers[i]);
  }
}

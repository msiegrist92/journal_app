const containers = document.querySelectorAll('.help_cont');



const reorderElements = (container) => {
  let image = container.querySelector('.help_img');
  let p = container.querySelector('.help_text');

  image = container.insertBefore(image, p);
  //elements are reorder now add inline styles
  imgFirstStyle(image, p);

}

//function which sets inline styles for elements when swapping image

const imgFirstStyle = (img, p) => {
  img.style.gridColumn = '1 / 2';
  p.style.gridColumn = '2 / 5';
}


//for loop over containers goes here
for(let i = 0; i < containers.length; i++){
  if(i % 2 === 0){
    reorderElements(containers[i]);
  }
}

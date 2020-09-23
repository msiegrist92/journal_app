const gridAreaStyle = elements => {
  for (element of elements){
    document.getElementById(element).style.gridArea = element;
  }
}

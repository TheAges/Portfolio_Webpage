function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


//window.setInterval(function() {document.body.style.backgroundColor = getRandomColor()}, 1000);
window.setInterval(function() {document.getElementById("main").style.color = getRandomColor()}, 1000);

var imgElement = document.getElementById("img");
var output = document.getElementById("imgShow");
imgElement.onchange = function (e) {
  var previewImg = URL.createObjectURL(e.target.files[0]);
  //   output.classList.remove("display");
  output.src = previewImg;
};

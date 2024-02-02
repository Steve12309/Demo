let input = document.getElementById("fileInput");
var imgOutput = document.getElementById("imgOut");
var frameE = document.getElementById("frameOut");
var frameE2 = document.getElementById("frameOut2");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var downloadBtn = document.getElementById("download");
var load = false;
var frameBorder1 = document.getElementById("border1");
var frameBorder2 = document.getElementById("border2");
var frameBorder3 = document.getElementById("border3");
var reloadBtn = document.getElementById("reload");
var frameInput = document.getElementById("frameInput");
var frameBtn = document.getElementById("addFrame");
var frameContainer = document.getElementById("newFrame");
var frameAdd = document.getElementById("frameOut3");

frameBtn.onclick = function () {
  frameInput.click();
};

frameInput.onchange = function (e) {
  var previewFrame = URL.createObjectURL(e.target.files[0]);
  frameAdd.src = previewFrame;
  frameAdd.classList.remove("display");
  frameContainer.classList.remove("position");
};

reloadBtn.onclick = function () {
  canvas.width = imgOutput.width - 4;
  canvas.height = imgOutput.height - 4;
  context.globalAlpha = 1;
  context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
};

function chooseFile() {
  document.getElementById("fileInput").click();
}

imgOutput.onload = function () {
  load = true;
  canvas.width = imgOutput.width - 4;
  canvas.height = imgOutput.height - 4;
  context.globalAlpha = 1;
  context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
  downloadBtn.onclick = function () {
    var previewCanvas = canvas.toDataURL();
    downloadBtn.download = "pic_frame.png";
    downloadBtn.href = previewCanvas;
  };
};

frameE.onclick = function () {
  if (load === false) {
    alert("Please upload your avatar before choose frame to add");
  } else {
    context.globalAlpha = 1;
    context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.drawImage(frameE, 0, 0, canvas.width, canvas.height);
    frameBorder1.classList.remove("display");
    frameBorder3.classList.add("display");
    frameBorder2.classList.add("display");
  }
};

frameE2.onclick = function () {
  if (load === false) {
    alert("Please upload your avatar before choose frame to add");
  } else {
    context.globalAlpha = 1;
    context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.drawImage(frameE2, 0, 0, canvas.width, canvas.height);
    frameBorder2.classList.remove("display");
    frameBorder3.classList.add("display");
    frameBorder1.classList.add("display");
  }
};

frameAdd.onclick = function () {
  if (load === false) {
    alert("Please upload your avatar before choose frame to add");
  } else {
    context.globalAlpha = 1;
    context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.drawImage(frameAdd, 0, 0, canvas.width, canvas.height);
    frameBorder3.classList.remove("display");
    frameBorder1.classList.add("display");
    frameBorder2.classList.add("display");
  }
};

input.onchange = function (e) {
  var previewImg = URL.createObjectURL(e.target.files[0]);
  imgOutput.src = previewImg;
};

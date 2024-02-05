let input = document.getElementById("fileInput");
var imgOutput = document.getElementById("imgOut");
var imgOutput2 = document.getElementById("imgOut2");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var downloadBtn = document.getElementById("download");
var load = false;
var reloadBtn = document.getElementById("reload");
var frameInput = document.getElementById("frameInput");
var frameBtn = document.getElementById("addFrame");
var leftE = document.getElementById("left");
var frameAlready = document.querySelectorAll(".already");
var count = 1;
var count1 = frameAlready.length + 1;
var canvas1 = document.getElementById("canvas-download");
var context1 = canvas1.getContext("2d");
var frameEs = document.querySelectorAll("#frameOut");
var frameBorders = document.querySelectorAll("#border");
function selectFrame(selectedIndex) {
  if (load === false) {
    alert("Please upload your avatar before choose frame to add");
  } else {
    frameEs.forEach(function (frame, index) {
      if (index + 1 == selectedIndex) {
        context.globalAlpha = 1;
        context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1;
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);
        context1.globalAlpha = 1;
        context1.drawImage(frame, 0, 0, canvas1.width, canvas1.height);
      } else {
      }
    });
    frameBorders.forEach(function (frameBorder, index) {
      if (index + 1 === selectedIndex) {
        frameBorder.classList.remove("display");
      } else {
        frameBorder.classList.add("display");
      }
    });
  }
}

frameBtn.onclick = function () {
  var frameContainer = document.createElement("div");
  frameContainer.id = "newFrame";
  frameContainer.classList.add("frame-container", "position", "BEN10" + count);
  var newFrameBorder = document.createElement("div");
  newFrameBorder.classList.add("card-border", "display");
  newFrameBorder.id = "border";
  frameContainer.appendChild(newFrameBorder);
  var newFrame = document.createElement("img");
  newFrame.src = "a";
  newFrame.classList.add("card", "display", "frameAdd", "LUFFY" + count);
  newFrame.id = "frameOut";
  newFrame.dataset.index = count1;
  var indexValue = newFrame.dataset.index;
  newFrame.addEventListener("click", function () {
    selectFrame(parseInt(indexValue));
  });
  frameContainer.appendChild(newFrame);
  leftE.insertBefore(frameContainer, frameInput);
  frameInput.click();
  frameInput.onchange = function (e) {
    var file = e.target.files[0];
    var urls = URL.createObjectURL(file);
    newFrame.src = urls;
    newFrame.classList.remove("display");
    frameContainer.classList.remove("position");
  };
  count1++;
  count++;
};

reloadBtn.onclick = function () {
  if (load === false) {
    alert("Can not find avatar with frame to reload");
  } else {
    canvas.width = imgOutput.width - 4;
    canvas.height = imgOutput.height - 4;
    context.globalAlpha = 1;
    context.drawImage(imgOutput, 0, 0, canvas.width, canvas.height);
  }
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
};

downloadBtn.onclick = function () {
  if (load === false) {
    alert("Can not find avatar or avatar with frame to download");
  } else {
    var previewCanvas = canvas1.toDataURL();
    downloadBtn.download = "pic_frame.png";
    downloadBtn.href = previewCanvas;
  }
};

input.onchange = function (e) {
  var file = e.target.files[0];
  var previewImg = URL.createObjectURL(e.target.files[0]);
  imgOutput.src = previewImg;
  imgOutput2.src = previewImg;
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      canvas1.width = img.naturalWidth;
      canvas1.height = img.naturalHeight;
      context1.globalAlpha = 1;
      context1.drawImage(imgOutput, 0, 0, canvas1.width, canvas1.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

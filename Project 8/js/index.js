let input = document.getElementById("fileInput");
var imgOutput = document.getElementById("imgOut");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
var originalWidth = 0;
var originalHeight = 0;
var nothin = true;
var scale = 1;
var translateX = 0;
var translateY = 0;
var isDragging = false;
var startX, startY;
var downloadBtn = document.getElementById("download");
var load = false;
var reloadBtn = document.getElementById("reload");
var frameInput = document.getElementById("frameInput");
var frameBtn = document.getElementById("addFrame");
var leftE = document.getElementById("left");
var frameAlready = document.querySelectorAll(".already");
var count = 1;
var count1 = frameAlready.length + 1;
var draw = false;
var times = 0;
var report = document.querySelector(".fa-flag");
var reportPage = document.querySelector(".report-page");
var info = document.querySelector(".fa-circle-info");
var infoPage = document.querySelector(".info-page");
var closeBtn = document.querySelector(".fa-xmark");
var closeBtn2 = document.querySelector(".fa-xmark2");
var mouse = document.querySelector(".right");

report.onclick = function () {
  reportPage.classList.remove("display");
};

info.onclick = function () {
  infoPage.classList.remove("display");
};

closeBtn.onclick = function () {
  infoPage.classList.add("display");
};

closeBtn2.onclick = function () {
  reportPage.classList.add("display");
};

function selectFrame(selectedIndex) {
  times = selectedIndex;
  if (load === false) {
    alert("Please upload your avatar before choose frame to add");
  } else {
    var frameEs = document.querySelectorAll("#frameOut");
    frameEs.forEach(function (frame, index) {
      if (index + 1 == selectedIndex) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          imgOutput,
          translateX,
          translateY,
          originalWidth * scale,
          originalHeight * scale
        );
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(frame, 0, 0, canvas2.width, canvas2.height);
      } else {
      }
    });
    var frameBorders = document.querySelectorAll("#border");
    frameBorders.forEach(function (frameBorder, index) {
      if (index + 1 === selectedIndex) {
        frameBorder.classList.remove("display");
      } else {
        frameBorder.classList.add("display");
      }
    });
    draw = true;
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
canvas.width = 600;
canvas.height = 600;
canvas2.width = 600;
canvas2.height = 600;
reloadBtn.onclick = function () {
  if (load === false) {
    alert("Can not find avatar with frame to reload");
  } else {
    scale = Math.max(
      canvas.width / originalWidth,
      canvas.height / originalHeight
    );
    translateX = (canvas.width - originalWidth * scale) / 2;
    translateY = (canvas.height - originalHeight * scale) / 2;
    context.drawImage(
      imgOutput,
      translateX,
      translateY,
      originalWidth * scale,
      originalHeight * scale
    );
  }
};

function chooseFile() {
  document.getElementById("fileInput").click();
  load = true;
}

imgOutput.onload = function () {
  draw = false;
};

downloadBtn.onclick = function () {
  if (load === false) {
    alert("Can not find avatar or avatar with frame to download");
  } else {
    var link = document.createElement("a");
    var previewCanvas = canvas.toDataURL();
    link.href = previewCanvas;
    link.download = "pic_frame.png";
    link.style.display = "none";
    link.click();
  }
};

input.onchange = function (e) {
  var previewImg = URL.createObjectURL(e.target.files[0]);
  imgOutput.src = previewImg;
  var img = new Image();
  img.src = previewImg;
  img.onload = function () {
    originalHeight = img.naturalHeight;
    originalWidth = img.naturalWidth;
    scale = Math.max(
      canvas.width / originalWidth,
      canvas.height / originalHeight
    );
    translateX = (canvas.width - originalWidth * scale) / 2;
    translateY = (canvas.height - originalHeight * scale) / 2;
    redrawImage();
  };
};

function redrawImage() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    imgOutput,
    translateX,
    translateY,
    originalWidth * scale,
    originalHeight * scale
  );
  draw = false;
  if (load === false) {
  } else {
    if (draw == false) {
      selectFrame(times);
    } else {
    }
  }
}

function updateZoom(newScale) {
  var mouseX = (canvas.width / 2 - translateX) / scale;
  var mouseY = (canvas.height / 2 - translateY) / scale;

  scale = newScale;
  translateX = canvas.width / 2 - mouseX * scale;
  translateY = canvas.height / 2 - mouseY * scale;

  redrawImage();
}

canvas2.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas2.addEventListener("mousemove", function (e) {
  if (isDragging) {
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;
    translateX += deltaX;
    translateY += deltaY;
    redrawImage();
    startX = e.clientX;
    startY = e.clientY;
  }
});

canvas2.addEventListener("mouseup", function () {
  isDragging = false;
});

canvas2.addEventListener("wheel", function (e) {
  e.preventDefault();
  var scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
  updateZoom(scale * scaleFactor);
});

window.onload = function () {
  alert(
    "Do phiên bản hiện tại các tính năng zoom và kéo thả ảnh chỉ đáp ứng cho máy tính và các thiết bị có sử dụng chuột mong bạn thông cảm và chuyển sang thiết bị khác hoặc chờ phiên bản kế tiếp nhé!"
  );
};

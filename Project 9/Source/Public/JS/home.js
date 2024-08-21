var createImgBtn = document.getElementById("infoForm");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var clientImg = document.querySelector(".clientImg");
var content = document.getElementById("content");
var width = clientImg.width;
var height = clientImg.height;
createImgBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  renderImg(clientImg, content.value, width, height);
});

function renderImg(clientImg, content, width, height) {
  canvas.width = width;
  canvas.height = height;
  var img = new Image();
  img.src = clientImg.src;

  img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.font = "bold 16px Arial";
    context.fillStyle = "black";
    var x = 370;
    var y = 440;
    var maxWidth = 600;
    var lineHeight = 30;
    var maxHeight = 600;

    wrapText(context, content, x, y, maxWidth, lineHeight, maxHeight);

    var dataURL = canvas.toDataURL("image/png");
    var downloadLink = document.getElementById("downloadLink");
    downloadLink.href = dataURL;
    downloadLink.download = "image.png";
    sendImgToServer(dataURL);
  };
}

function wrapText(context, text, x, y, maxWidth, lineHeight, maxHeight) {
  var line = "";
  var testHeight = y;
  var lines = [];
  for (var n = 0; n < text.length; n++) {
    var testLine = line + text[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = text[n];
      testHeight += lineHeight;

      if (testHeight + lineHeight > maxHeight) {
        lines.push(line.trim() + "...");
        break;
      }
    } else {
      line = testLine;
    }
  }
  if (testHeight + lineHeight <= maxHeight) {
    lines.push(line);
  }
  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

function changeImg(ele) {
  var number = ele.getAttribute("number");
  clientImg.src = `../../../img/template${number}.jpg`;
  content.value = "";
}

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(",");
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

function sendImgToServer(dataURL) {
  var email = document.querySelector(`input[type="email"]`);
  var emailValue = email.value;
  var blob = dataURLToBlob(dataURL);
  var formData = new FormData();
  formData.append("image", blob, "image.jpg");
  formData.append("email", emailValue);

  fetch("/uploadImg", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Server responded with: ${text}`);
        });
      }
      return JSON.stringify(response);
    })
    .then((data) => {
      console.log("Success:", data);
      doneSend();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function doneSend() {
  var email = document.querySelector(`input[type="email"]`);
  email.value = "";
  content.value = "";
  alert(
    "Cảm ơn bạn đã gửi một bức thư đầy cuti và dễ thương về câu lạc bộ Tin học Its Future chúng mình nhé. Bạn hãy kiểm tra hòm thư để nhận món quà đặc biệt của chúng mình nhé! Chúng bạn một ngày tốt lành!!!"
  );
}

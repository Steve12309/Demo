var settingMode = document.querySelector(".fa-gear");
var settingTable = document.querySelector(".icon-span");
var closeMode = document.querySelector(".fa-xmark");
var blurScreen = document.querySelector(".demo");
var inputElements = document.querySelectorAll("input");
var musicMode = document.getElementsByName("music");
var audioElement = document.querySelector("audio");
const promise = audioElement.play();
let playedOnLoad;
if (promise !== undefined) {
  promise
    .then((_) => {
      playedOnLoad = true;
    })
    .catch((error) => {
      playedOnLoad = true;
    });
}

if (playedOnLoad == true) {
  audioElement.play();
} else {
}

window.onload = function () {
  var mode = localStorage.getItem("mode");
  if (mode == "on") {
    var x = document.querySelector('input[value="On"]');
    x.setAttribute("checked", "");
  } else {
    var y = document.querySelector('input[value="Off"]');
    y.setAttribute("checked", "");
  }
};

settingMode.onclick = function () {
  settingTable.style.display = "block";
  blurScreen.style.display = "block";
  console.log(settingTable);
};

closeMode.onclick = function () {
  settingTable.style.display = "none";
  blurScreen.style.display = "none";
  console.log(settingTable);
};

function Demo() {
  var x = "";
  for (i = 0; i < musicMode.length; i++) {
    if (musicMode[i].checked) {
      x = musicMode[i].value;
    }
  }
  if (x == "On") {
    audioElement.setAttribute("mode", "on");
  } else {
    audioElement.setAttribute("mode", "off");
  }
  var mode = audioElement.getAttribute("mode");
  localStorage.setItem("mode", mode);
  check();
}

function check() {
  var mode = localStorage.getItem("mode");
  if (mode == "on") {
    audioElement.removeAttribute("muted");
    audioElement.setAttribute("mode", "on");
    audioElement.play();
  } else {
    audioElement.pause();
    audioElement.setAttribute("muted", "");
    audioElement.setAttribute("mode", "off");
  }
}

function change() {
  window.location = "../html/next.html";
}

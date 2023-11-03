//editör ekleme
let editor;

ClassicEditor.create(document.querySelector("#editor"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    //console.error(error);
  });

var moodDivs = document.querySelectorAll(".mode-content div");
//mode animation
moodDivs.forEach(function (div) {
  div.addEventListener("click", function () {
    div.classList.add("animate__animated", "animate__zoomIn");
    setTimeout(function () {
      div.classList.remove("animate__animated", "animate__zoomIn");
    }, 1000);
  });
});

//menü background
$(".page-header div").on("click", function () {
  $(".page-header div").removeClass("active");
  $(this).addClass("active");
});

//rain animation
var rain = function () {
  $(".rain").empty();

  var increment = 0;
  var drops = "";

  while (increment < 95) {
    var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    var randoFiver = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    increment += randoFiver;
    drops +=
      '<div class="drop" style="left: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"><div class="stem" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div><div class="splat" style="animation-delay: 0.' +
      randoHundo +
      "s; animation-duration: 0.5" +
      randoHundo +
      's;"></div></div>';
  }

  $(".rain").append(drops);
};

rain();

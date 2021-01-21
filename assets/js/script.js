
$(document).ready(function () {





  var btn = document.querySelector("#btnModal");
  var modal = document.querySelector(".modal");
  var modalbg = document.querySelector(".modal-background");
  var btnClose = document.querySelector("#btn-close");

  //pop up the rules modal
  btn.addEventListener("click", () => {
    modal.classList.add("is-active");
  });

  //close the rules modals
  modalbg.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
  btnClose.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
  $(".play-section").hide();
  var btnPlay = document.querySelector("#play");

  $("#play").on("click", function () {
    $(".home").hide();
    $(".play-section").show();
  })


})
const sound = new Audio()
sound.src = `./assets/audio/main-menu.mp3`

// Hidden From Start
$('.home-gambit').hide()
$('.button-box').hide()
$('.home h1').hide()
$('.play-section').hide()
$('.shop').hide();

async function playSong(song) {
  sound.currentTime = 0
  await sound.play()
}

var stopSong = function () {
  sound.pause()
}

$('#start').on('click', function () {
  playSong()
  $('.start').fadeOut()
  $('.home-gambit').fadeIn()
  $('.button-box').fadeIn()
  $('.home h1').fadeIn()

})


$('#play').on('click', function () {
  playerMoney()
  $('.home').hide()
  $('.play-section').show()
  $('.gambit-special').hide()
  stopSong()
})
$('.special-btn').on('click', function () {
  $('.gambit-special').fadeIn()
})
$('#btnModal').on("click", () => {
  $('.modal').addClass("is-active");
})
//close the rules modals
$('.modal-background').on("click", () => {
  $('.modal').removeClass("is-active");
})
$('#btnClose').on("click", () => {
  $('.modal').removeClass("is-active");
})
//go to shop page from play page
$("#shop").on("click", () => {
  $(".play-section").hide();
  $(".shop").show();
})
//back to home from play page
$("#home").on("click", () => {
  $(".play-section").hide();
  $(".home").show();
})

//back to home from shop page
$(".return-home").on("click", () => {
  $(".play-section").hide();
  $(".home").show();
})

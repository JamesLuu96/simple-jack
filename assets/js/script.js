const sound = new Audio()
sound.loop = true
sound.src = `./assets/audio/main-menu.mp3`

// Hidden From Start
$('.home-gambit').hide()
$('.button-box').hide()
$('.home h1').hide()
$('.play-section').hide()
$('.shop').hide();

async function playSong(song) {
  song.currentTime = 0
  await song.play()
}

var stopSong = function (song) {
  song.pause()
}

$('#start').on('click', function () {
  playSong(sound)
  $('.start').fadeOut()
  $('.home-gambit').fadeIn()
  $('.button-box').fadeIn()
  $('.home h1').fadeIn()

})


$('#play').on('click', function () {
    $('.home').hide()
    $('.play-section').show()
    $('.gambit-special').hide()
    var jokerEntry = new Audio()
    jokerEntry.src = `./assets/audio/Joker/joker-entry.wav`
    jokerEntry.play()
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

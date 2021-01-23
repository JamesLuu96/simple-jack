// Hidden From Start
$('.home-gambit').hide()
$('.button-box').hide()
$('.home h1').hide()
$('.play-section').hide()
$('.shop').hide();
$('#mute').hide()


$('#start').on('click', function () {
  playSong(mySong)
  $('.start').fadeOut()
  $('.home-gambit').fadeIn()
  $('.button-box').fadeIn()
  $('.home h1').fadeIn()
  $('#mute').show()
})


$('#play').on('click', function () {
    $('.home').hide()
    $('.play-section').show()
    $('.gambit-special').hide()
    randomEntryAudio()
    setTimeout(function(){
        $('#dealer-text').hide()
        $('#player-text').hide()
        $('#play-button').show()
    }, 4500)
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

$('#btn-close').on("click", () => {
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


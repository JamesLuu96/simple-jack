// ----------------------Enter Site Section----------------------
var enterSite = function () {
    $('.home-hidden').hide()
    $('#play').hide()
    $('#shop').hide()
    $('#contact').hide()
    $('.navbar').hide()
    $('#footer').hide()
}
enterSite()
// Enter Site Button Event Listener
$('#enter-site button').on('click', function (event) {
    event.preventDefault()
    $('.home-hidden').fadeIn()
    $('#enter-site').fadeOut()
    $('#mute').fadeIn()
    playSong(mySong)
})
// ----------------------Home Section----------------------

// Play Game Button
var enterPlaySite = function () {
    $('#play').show()
    $('#home').hide()
    $('.navbar').fadeIn()
    $('.nav-shop').show()
    $('.play-game-buttons').hide()
    $('.nav-search').hide()
    $('.navbar p').text(bankMoney)
}
$('#home-play').on('click', function (event) {
    event.preventDefault()
    enterPlaySite()
})

// Opens Rules
$('#home-rules').on('click', function () {
    $('.rules-modal').addClass("is-active")
})
$('.modal-background').on("click", () => {
    $('.modal').removeClass("is-active");
})
$('#btn-close').on("click", () => {
    $('.modal').removeClass("is-active");
})

// ----------------------Play Section----------------------
// Back to Home Button

var enterHomeSiteFromPlay = function () {
    $('.navbar').hide()
    $('#home').show()
    $('#shop').hide()
    $('#play').hide()
}
$('.navbar .navbar-start h1').on('click', function (event) {
    event.preventDefault()
    enterHomeSiteFromPlay()
})

$(".play-placebet").on("click", function (event) {
    event.preventDefault()
    $('.modal-place-bet').addClass("is-active");
    $('#play-bet span').text(bankMoney)
    $('#bet-money').trigger('select');
})
$('.btn-reload').on('click', function (event) {
    event.preventDefault()
    $('.modal').removeClass("is-active");
})
$('#play-bet form').on('submit', function (event) {
    event.preventDefault()
    $('.modal').removeClass("is-active");
})

// Take you to Shop
var enterShop = function () {
    $('.nav-search').show()
    $('.nav-shop').hide()
    $('#shop').show()
    $('#play').hide()
    $('.shop-select').hide()
    $('.search').trigger('input')
    shopAudio()
}
$('.nav-shop').on('click', function (event) {
    event.preventDefault()
    enterShop()
})

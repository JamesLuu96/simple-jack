// $('#enter-site').show()
$('#enter-site').hide()
$('#home').show()
// $('#home').hide()
// $('#play').show()
// $('#shop').show()
// $('#contact').show()
// $('#contact').hide()
$('#play').hide()
// $('.navbar').show()
$('#navbar').hide()
$('.navbar-end').hide()
// $('#contact-footer').show()
$('#contact-footer').hide()
$('#shop').hide()

// Home Section
$('#home-rules').on('click', function () {
    $('.rules-modal').addClass("is-active")
    console.log(`hello`)
})
$('.modal-background').on("click", () => {
    $('.modal').removeClass("is-active");
})
$('#btn-close').on("click", () => {
    $('.modal').removeClass("is-active");
})

// Play Section
$(".play-placebet").on("click", function (event) {
    event.preventDefault()
    $('.modal-place-bet').addClass("is-active");
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

//
// $(document).ready(function () {

// Check for click events on the navbar burger icon
// $(".navbar").click(function () {

//     // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//     $(".navbar").toggleClass("is-active");
//     $(".navbar-menu").toggleClass("is-active");

// });
// });

// var mql = window.matchMedia('(max-width: 600px)');

// function screenTest(e) {
//     if (e.matches) {
//         /* the viewport is 600 pixels wide or less */
//         console.log("tru")

//         $('.user-info').hide()
//         $('.play-player').hide()
//         $('.play-dealer').hide()
//         $('.play-game-buttons').hide()

//     } else {
//         /* the viewport is more than than 600 pixels wide */
//         console.log("fal")

//         $('.play-player').show()
//         $('.user-info').show()
//         $('.play-dealer').show()

//     }
// }

// mql.addEventListener('change', screenTest);

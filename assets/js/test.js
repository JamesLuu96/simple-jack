$('#enter-site').show()
$('#home').show()
$('#play').show()
$('#shop').show()
$('#contact').show()

// Home Section
$('#home-rules').on('click', function(){
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



// Enter Site Section
var enterSite = function(){
    $('.home-hidden').hide()
    $('#play').hide()
    $('#shop').hide()
    

}
// Home Section

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

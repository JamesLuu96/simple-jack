// player Object
var player = JSON.parse(localStorage.getItem('player')) ||
{
    name: 'player',
    character: 'gambit',
    level: 1,
    maxHp: 100,
    hp: 100,
    hand: [],
    handSum: 0,
    money: 300,
    bet: 0,
    inventory: [
        {
            name: 'Level 1 Might',
            path: 'https://images-na.ssl-images-amazon.com/images/I/71sFiAksnIL._AC_SY450_',
            ext: '.jpg',
            might: 1,
            mightAdd: true,
        }],
    mightSum: 1,
    mightProduct: 1,
    healAmount: 0
}
// dealer Object
var dealer = JSON.parse(localStorage.getItem('dealer')) ||
{
    name: 'dealer',
    level: 1,
    maxHp: 100,
    hp: 100,
    hand: [],
    handSum: 0,
    xp: 0
}

// ----------------------Enter Site Section----------------------
var enterSite = function () {
    $('.home-hidden').hide()
    $('#play').hide()
    $('#shop').hide()
    $('#contact').hide()
    $('.navbar').hide()
    $('#footer').hide()
    $('#enter-site button').hide()
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
    $('.nav-shop').hide()
    $('.start-btn').hide()
    $('.search-character').hide()
    $('.play-game-buttons').hide()
    $('.nav-search').hide()
    $('#search').hide()
    $(`.play-cards`).hide()
    $('.navbar p').text(player.money)
    $('#player .play-level').text(player.level)
    $('#dealer .play-level').text(dealer.level)
    $('#player .play-health').text(`HP: ${player.hp}/${player.maxHp}`)
    $('#dealer .play-health').text(`HP: ${dealer.hp}/${dealer.maxHp}`)
    randomEntryAudio()
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
$('.modal-unlock-message button').on("click", () => {
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


$('.btn-reload').on('click', function (event) {
    event.preventDefault()
    $('.modal').removeClass("is-active");
})


// Take you to Shop
var enterShop = function () {
    $('.nav-search').show()
    $('.nav-shop').hide()
    $('#shop').show()
    $('#play').hide()
    $('#search').show()
    $('.search-character').show()
    $('.series').trigger('change')
    shopAudio()
}
$('.nav-shop').on('click', function (event) {
    event.preventDefault()
    enterShop()
})

// ----------------------Save Game----------------------

var saveGame = function () {
    localStorage.setItem('player', JSON.stringify(player))
    localStorage.setItem('dealer', JSON.stringify(dealer))
    localStorage.setItem('characters', JSON.stringify(characters))
}

var levelUp = function () {
    if (dealer.hp === 0) {
        player.level++
        player.inventory[0].name = `Level ${player.level} Might`
        player.inventory[0].might++
        updateStats()
        player.maxHp += player.level * 20
        player.hp = player.maxHp
        dealer.hp = dealer.maxHp
    }
    if (player.hp === 0 || dealer.xp === 5) {
        dealer.level++
        dealer.maxHp += dealer.maxHp * .3
        dealer.hp = dealer.maxHp
        if (player.hp === 0) {
            player.hp = player.maxHp
        }
        dealer.xp = 0
    }
}
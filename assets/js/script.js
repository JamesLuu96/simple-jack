var gameVersion;
var characters = []

if(localStorage.getItem('gameVersion')){
    gameVersion = localStorage.getItem('gameVersion')
}

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
    $('#enter-site .btn-red').hide()
    $('#enter-site .enter-site-btn').hide()
    // If Update is not Current
    if(gameVersion !== '1.7' || !localStorage.getItem('characters')){
        $('#enter-site .btn-red').show()
    // If Update is Current
    }else{
        async function showSite(){
            if(localStorage.getItem('characters')){
                characters = JSON.parse(localStorage.getItem('characters'))
            }else{
                await seriesList()
            }
            $('#enter-site .enter-site-btn').show()
        }
        showSite()
    }

}
enterSite()
// Enter Site Button Event Listener
$('#enter-site .enter-site-btn').on('click', function(event){
    event.preventDefault()
    $('.home-hidden').fadeIn()
    $('#enter-site').fadeOut()
    $('#mute').fadeIn()
    playSong(mySong)
})
// Update Game Button
$('#enter-site .btn-red').on('click', function(event){
    event.preventDefault()
    async function updateGame(){
        characters = []
        gameVersion = '1.7'
        player = { 
            name: 'player',
            character: 'gambit',
            level: 1,
            maxHp: 100,
            hp: 100,
            hand: [],
            handSum: 0,
            money: 300,
            bet: 0,
            inventory: [{
                name: 'Level 1 Might',
                path: 'https://images-na.ssl-images-amazon.com/images/I/71sFiAksnIL._AC_SY450_',
                ext: '.jpg',
                might: 1,
                mightAdd: true
            }],
            mightSum: 1,
            mightProduct: 1,
            healAmount: 0
        }
        dealer = { 
            name: 'dealer',
            level: 1,
            maxHp: 100,
            hp: 100,
            hand: [],
            handSum: 0,
            xp: 0
        }
        await seriesList()
        saveGame()
        $('#enter-site .enter-site-btn').show()
    }
    $('#enter-site .btn-red').hide()
    updateGame()
})
// ----------------------Home Section----------------------

// Play Game Button
var enterPlaySite = function () {
    $('#play').show()
    $('.nav-might').show()
    $('#home').hide()
    $('#play').prepend($('.navbar'))
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
    $('#contact').hide()
    $('#home').show()
    $('#shop').hide()
    $('#play').hide()
    $('.search-bar-icon').hide()
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
    if ($('.main-nav').is(':visible')){
        if(window.matchMedia('(max-width: 767px)').matches){
            $('.main-nav').slideToggle(200)
        }
    }
    $('.nav-search').show()
    $('#shop').append($('#footer'))
    $('#footer').show()
    $('.nav-shop').hide()
    $('#shop').prepend($('.navbar'))
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

// ----------------------Shop Screen----------------------

$('#footer h1').on('click', function(event){
    event.preventDefault()
    $('#contact').fadeIn()
    $('#contact').prepend($('.navbar'))
    $('#contact').append($('#footer'))
    $('#shop').hide()
    $('#footer').hide()
    $('.nav-search').hide()
    $('.nav-might').hide()
})

// ----------------------Save Game----------------------

function saveGame(){
    localStorage.setItem('player', JSON.stringify(player))
    localStorage.setItem('dealer', JSON.stringify(dealer))
    localStorage.setItem('gameVersion', gameVersion)
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
        dealer.maxHp += Math.floor(dealer.maxHp * .3)
        dealer.hp = dealer.maxHp
        if (player.hp === 0) {
            player.hp = player.maxHp
        }
        dealer.xp = 0
    }
}
$('#menu').on('click', function () {
    $('.main-nav').slideToggle(200, function(){
        if ($(this).is(':visible')){
            $(this).css('display','flex');
        }
    })
    
})

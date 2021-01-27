var deckId;

// player Object
var player = JSON.parse(localStorage.getItem(player)) || 
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
    inventory: [],
    mightSum: 0,
    mightProduct: 0
}
// dealer Object
var dealer = JSON.parse(localStorage.getItem(dealer)) || 
{ 
    name: 'dealer',
    level: 1,
    maxHp: 100,
    hp: 100,
    hand: [],
    handSum: 0
}
var resetGame = function(playerObj){
    playerObj.hand = []
    playerObj.handSum = 0
    return playerObj
}

async function beginGame(){
    await getDeck()
    player = resetGame(player)
    dealer = resetGame(dealer)
    player = await dealCard(2, player)
    dealer = await dealCard(2, dealer)
    $(`.play-cards`).show()
    checkCards()
}

// Fetches New Deck
async function getDeck() {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`)
    const data = await res.json()
    deckId = data.deck_id
}
// Deals Card and shows it
async function dealCard(number, playerObj) {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw?count=${number}`)
    const data = await res.json()
    for (let i = 0; i < number; i++) {
        var cardValue = cardValueEvaluate(data.cards[i].code, playerObj);
        var cardObj = {
            card: data.cards[i].code,
            value: cardValue,
            img: data.cards[i].image
        }
        playerObj.hand.push(cardObj)
    }
    playerObj = updateSum(playerObj)
    
    if(playerObj.name === 'dealer' && playerObj.hand.length < 2){
        $(`.play-${playerObj.name} .play-cards`).append($('<img>').attr('src', 'https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png'))
    }else if(playerObj.name === 'dealer' && playerObj.hand.length === 2){
        $(`.play-${playerObj.name} .play-cards`).text('')
        $(`.play-${playerObj.name} .play-cards`).append($('<img>').attr('src', 'https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png'))
        $(`.play-${playerObj.name} .play-cards`).append($('<img>').attr('src', playerObj.hand[1].img))
        $(`.play-${playerObj.name} .play-score span`).text(playerObj.handSum - playerObj.hand[0].value)
        $(`.play-${playerObj.name} .play-score`).show()
    } else{
        $(`.play-${playerObj.name} .play-cards`).text('')
        for(let i = 0; i < playerObj.hand.length; i++){
            $(`.play-${playerObj.name} .play-cards`).append($('<img>').attr('src', playerObj.hand[i].img))
        }
        $(`.play-${playerObj.name} .play-score span`).text(playerObj.handSum)
        $(`.play-${playerObj.name} .play-score`).show()
    }
    return playerObj
}
// Updates Sum of Hand
var updateSum = function(playerObj){
    playerObj.handSum = playerObj.hand.reduce((x , y) => x + y.value, 0)
    return playerObj
}

// Evaluates Card's Value
var cardValueEvaluate = function (string, playerObj) {
    // defines cardValue
    switch(string[0]){
        case 'A':
            var cardValue = 1
            if(playerObj.handSum + 11 <= 21){
                cardValue = 11
            }
            break;
        case 'K': case 'Q': case 'J': case '0':
            var cardValue = 10
            break;
        default:
            var cardValue = parseInt(string[0])
    }
    // checks to see if the sum is more than 21
    if (cardValue + playerObj.handSum > 21) {
        //goes through the array, changes all ace values to 1
        for (let i = 0; i < playerObj.hand.length; i++) {
            if (playerObj.hand[i].card[0] === "A") {
                playerObj.hand[i].value = 1;
            }
        }
    }
    return cardValue;
}
// Check Cards
async function checkCards() {
    if(player.handSum >= 21){
        await endGame()
    }else{
        continueGame()
    }
}

function continueGame(){
    $('.play-game-buttons').show()
    if (player.money < (2 * player.bet) || player.hand.length > 2) {
        $('.play-double').hide()
    } else{
        $('.play-double').show()
    }
}

async function endGame(){
    while (dealer.handSum < 17) {
        dealer = await dealCard(1, dealer);
    }
    // reveals first card if dealer has 2 cards only
    if(dealer.hand.length === 2){
        $(`.play-dealer .play-cards`).text('')
        for(let i = 0; i < dealer.hand.length; i++){
            $(`.play-dealer .play-cards`).append($('<img>').attr('src', dealer.hand[i].img))
        }
        $(`.play-dealer .play-score span`).text(dealer.handSum)
    }
    if(player.handSum > 21){
        gameOver('lose')
    }else if(dealer.handSum > 21){
        gameOver('win')
    }else if(dealer.handSum === player.handSum){
        gameOver('tie')
    }else if(dealer.handSum > player.handSum){
        gameOver('lose')
    }else{
        gameOver('win')
    }
}

async function doubleDown() {
    player.bet = 2 * player.bet
    player = await dealCard(1, player)
    endGame()
}

var gameOver = function (result) {
    $('.play-game-buttons').hide()
    switch (result){
        case 'win':
            $('.play-result').text(`You Won! You earned ${player.bet} might!`)
            player.money += player.bet
            break
        case 'lose':
            $('.play-result').text(`You Lost. You lost ${player.bet} might!`)
            player.money -= player.bet
            break

        case 'tie':
            $('.play-result').text(`You tied.`)
            break
    }
    $('.navbar p').text(player.money)
    $('.play-result').show()
    saveGame()
    setTimeout(function () {
        $('.play-placebet').show()
        $('.navbar h1').show()
        $('.navbar .nav-shop').show()
        $('.play-result').text('')
        $('.play-cards').hide()
        $('.play-score').hide()
    }, 5000)
}

$(".play-placebet").on("click", function (event) {
    event.preventDefault()
    $('.modal-place-bet').addClass("is-active");
    $('#play-bet span').text(player.money)
    $('#bet-money').trigger('select');
})

$('#play-bet form').on('submit', function (event) {
    event.preventDefault()
    player.bet = parseInt($('#bet-money').val())
    if (player.bet > player.money || player.bet === NaN || !player.bet) {
        return
    }
    $('.play-placebet').hide()
    $('.navbar h1').hide()
    $('.navbar .nav-shop').hide()
    $('.modal').removeClass("is-active");
    beginGame();
})

$('.play-hit').on('click', async function(event) {
    event.preventDefault()
    player = await dealCard(1, player)
    checkCards()
})

$('.play-stand').on('click', function(event) {
    event.preventDefault()
    endGame()
})

$('.play-double').on('click', function(event){
    event.preventDefault()
    doubleDown();
})

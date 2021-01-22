var playButtonEl = document.querySelector(".play-button");
$('.game').hide()
var urlAddress = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let deckId;
var dealerHand;
var playerHand;
var bankMoney = 300;
let betAmount = 0;

var placeBet = function() {
    var betAmount = parseInt(prompt(`How much do you want to bet?
    You can place a bet up to $${bankMoney} dollars.`));
    return betAmount;
}

// Evaluates Card Values
var cardValueEvaluate = function(string, objArr){
    let cardValue = 0;
    let playerSum = objArr.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    if (string[0] === "A") {
    //    if (playerSum>10){
    // the objArr check may be unnecessary
        if (playerSum>10 || objArr.some(code => code.card = "[^=A]")) {
            cardValue = 1;
        }
        else {
            cardValue = 11;
        } 
    }
    else if (string[0]==="K" || string[0]==="Q" || string[0]==="J" || string[0]==="0") {
        cardValue = 10;
    }
    else {
        cardValue = parseInt(string[0]);
    }
    return cardValue;
}

// Starts Game
async function playGame(){
    await getDeck()
    dealerHand = await dealCard(2, [])
    playerHand = await dealCard(2, [])
    displayHand('player')
    checkCards(false)
}

// Gets a new deck id 
async function getDeck(){
    const res = await fetch(urlAddress)
    const data = await res.json()
    deckId = data.deck_id
}


// Deals a card whether at beginning of game or hitting
async function dealCard(integer, hand) {
    var hand = hand;
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw?count=${integer}`)
    const data = await res.json()

    for (let i=0; i<integer; i++){
        var cardValue = cardValueEvaluate(data.cards[i].code, hand);
        var cardObj = {
            card: data.cards[i].code,
            // card: "AH",
            value: cardValue,
            img: data.cards[i].image
        }
        hand.push(cardObj)
    }
    return hand
}


// Compares Hands
function checkCards(standCheck){
    betAmount = placeBet();
    // Creates Sum of Hand Variables to Compare
    let playerSum = playerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    let dealerSum = dealerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    console.log(`player = ${playerSum} \n dealer = ${dealerSum}`)
    // Checks if you are standing
    // If not
    if (!standCheck){
        if (dealerSum > 21 && playerSum > 21){
            playerTie();
        } else if (dealerSum > 21){
            playerWin(betAmount);
        } else if (playerSum > 21){
            playerLose(betAmount);
        } else if (dealerSum === 21 && playerSum !== 21){
            playerLose(betAmount);
        } else if (playerSum === 21 && dealerSum !== 21){
            playerWin(betAmount);
        }else {
            $('.game').show()
            $('.box').hide()
        }
    } else {
        if (playerSum > dealerSum){
            playerWin(betAmount);
        } else if (dealerSum > playerSum){
            playerLose(betAmount);
        } else {
            playerTie();
        }
    }
}

// Displays Hand on HTML
var displayHand = function(player){
    $(`.${player}-cards`).text('')
    // Adds Card
    if(player === 'player'){
        for(let i = 0; i < playerHand.length; i++){
            var card = $('<img>').attr('src', playerHand[i].img)
            $(`.${player}-cards`).append(card)
        }
    } else {
        for(let i = 0; i < dealerHand.length; i++){
            var card = $('<img>').attr('src', dealerHand[i].img)
            $(`.${player}-cards`).append(card)
        }
    }
}

var playerTie = function(){
    console.log(`You tied`)
    gameOver()
}
var playerLose = function(integer){
    console.log(bankMoney, integer);
    bankMoney = bankMoney - integer;
    console.log(`You lose, you now have ${bankMoney} dollars`)
    gameOver()
}
var playerWin = function(integer){
    console.log(bankMoney, integer);
    bankMoney += integer;
    console.log(`You win, you now have ${bankMoney} dollars`)
    gameOver()
}
var gameOver = function(){
    displayHand('player')
    displayHand('dealer')
    $('.game').hide()
    setTimeout(function(){
        $('.box').show()
        $('.cards').text('')
    }, 10000)
}



$("#play-button").on("click", function(event){
    event.preventDefault()
    playGame();
})

$('.hit').on('click', async function(event){
    event.preventDefault()
    await dealCard(1, playerHand)
    displayHand('player')
    checkCards(false)
})

$('.stand').on('click', async function(event){
    event.preventDefault()
    checkCards(true)
})

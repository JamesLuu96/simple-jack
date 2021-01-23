var urlAddress = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
let deckId;
var dealerHand;
var playerHand;
var bankMoney = 300;
let betAmount = 0;
$('.game-button-container').hide()
$('.special-btn').hide()
$('.player p').hide()
$('.dealer p').hide()

var placeBet = function() {
    betAmount = parseInt(prompt(`How much do you want to bet?
    You can place a bet up to $${bankMoney} dollars.`));
    if (betAmount > bankMoney || betAmount === NaN){
        placeBet()
    }
}

// Evaluates Card Values
var cardValueEvaluate = function(string, objArr){
    let cardValue = 0;
    let playerSum = objArr.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    if (string[0] === "A") {
        cardValue = 1;
        if (cardValue + playerSum + 10 <=21) {
            cardValue+=10;
        }
    //    if (playerSum>10){
    // the objArr check may be unnecessary
        // if (playerSum>10 || objArr.some(code => code.card === ("AH"||"AD"||"AC"||"AS"))) {
        //     cardValue = 1;
        // }
        // else {
        //     cardValue = 11;
        // } 
    }
    else if (string[0]==="K" || string[0]==="Q" || string[0]==="J" || string[0]==="0") {
        cardValue = 10;
    }
    else {
        cardValue = parseInt(string[0]);
    }
    //checks to see if the sum has gone over AND the hand has an ACE
    if (cardValue + playerSum > 21 && objArr.some(code => code.card === ("AH"||"AD"||"AC"||"AS"))){
        //goes through the array, changes all ace values to 1
        for (let i = 0; i < objArr.length ; i++) {
            if (objArr[i].card === ("AH"||"AD"||"AC"||"AS")) {
                objArr[i].value = 1;
            }
        }
    }
    return cardValue;
}

// Starts Game
async function playGame(){
    placeBet();
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
async function checkCards(standCheck){
    
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
            $('.dealer-cards').text('')
            $('.dealer-cards').append($('<img>').attr('src','https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png'),$('<img>').attr('src',dealerHand[1].img))
            $('.dealer span').text(dealerHand[1].value)
            $('.dealer p').show()
            $('.game-button-container').show()
            $('.box').hide()
        }
    } else {
        //deals cards to dealer if the dealerSum is less than 17
        // debugger;
        while (dealerSum < 17 ) {
            await dealCard (1, dealerHand);
            dealerSum = dealerHand.reduce(function(accumulator, currentValue){
                return accumulator + currentValue.value;
            }, 0)
        }
        //if the dealer goes over, dealer loses
        if (dealerSum > 21) {
            playerWin(betAmount);
        } 
        // if the dealer hits 21, dealer wins (already checked if player had 21)
        else if (dealerSum === 21) {
            playerLose(betAmount);
        }
        else if (playerSum > dealerSum){
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
    let playerSum = playerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    let dealerSum = dealerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    $(`.${player}-cards`).text('')
    // Adds Card
    if(player === 'player'){
        for(let i = 0; i < playerHand.length; i++){
            var card = $('<img>').attr('src', playerHand[i].img)
            $(`.${player}-cards`).append(card)
            $('.player span').text(playerSum)
            $('.player p').show()
        }
    } else {
        for(let i = 0; i < dealerHand.length; i++){
            var card = $('<img>').attr('src', dealerHand[i].img)
            $(`.${player}-cards`).append(card)
            $('.dealer span').text(dealerSum)
            $('.dealer p').show()
        }
    }
}

var playerTie = function(){
    console.log(`You tied`)
    gameOver()
}
var playerLose = function(integer){
    var gambitLose = new Audio()
    gambitLose.src = `./assets/audio/Gambit/gambit-lose.wav`
    var jokerWin = new Audio()
    jokerWin.src = `./assets/audio/Joker/joker-win.wav`
    gambitLose.play()
    gambitLose.onended = function(){
        jokerWin.play()
    }
    console.log(bankMoney, integer);
    bankMoney = bankMoney - integer;
    console.log(`You lose, you now have ${bankMoney} dollars`)
    gameOver()
}
var playerWin = function(integer){
    var jokerLose = new Audio()
    jokerLose.src = `./assets/audio/Joker/joker-lose.wav`
    jokerLose.play()
    console.log(bankMoney, integer);
    bankMoney += integer;
    console.log(`You win, you now have ${bankMoney} dollars`)
    gameOver()
}
var gameOver = function(){
    displayHand('player')
    displayHand('dealer')
    $('.game-button-container').hide()
    setTimeout(function(){
        $('#play-button').show()
        $('.cards').text('')
        $('.player span').text(0)
        $('.player p').hide()
        $('.dealer span').text(0)
        $('.dealer p').hide()

    }, 5000)
}



$("#play-button").on("click", function(event){
    event.preventDefault()
    $('#play-button').hide()
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

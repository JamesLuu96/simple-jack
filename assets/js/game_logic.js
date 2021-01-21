var playButtonEl = document.querySelector(".play-button");
var dealerHand = [];
var playerHand = [];
var urlAddress = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let deckId = ""

var cardValueEvaluate = function(string){
    let cardValue = 0;
    if (string[0] === "A") {
        cardValue = 11;
    } 
    else if (string[0]==="K" || string[0]==="Q" || string[0]==="J" || string[0]==="0") {
        cardValue = 10;
    }
    else {
        cardValue = parseInt(string[0]);
    }
    return cardValue;
}


// console.log(dealerHand);


var playGame = function(){
    dealerHand = [];
    playerHand = [];
    getDeck()
}

var getDeck = function(){
    fetch(urlAddress).then(function(response){
        if(response.ok){
            response.json()
            .then(function(data){
                deckId = data.deck_id
                dealCard(deckId, 2, 'Dealer')
                dealCard(deckId, 2, 'Me')
            })
        }
    })
}


var dealCard = function(deckId, integer, player) {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw?count=${integer}`)
    .then(function(response){
        response.json()
        .then(function(response){
        for (let i=0; i<integer; i++){
            var cardValue = cardValueEvaluate(response.cards[i].code);
            var cardObj = {
                card: response.cards[i].code,
                value: cardValue,
                img: response.cards[i].image
            }
            if (player !== 'Dealer'){
                playerHand.push(cardObj);
            } else{
                dealerHand.push(cardObj)
            }
        }
        if(playerHand.length === null){

        }else{
            checkCards()
        }
        })
    })
}

var checkCards = function(){
    let playerSum = playerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    let dealerSum = dealerHand.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.value;
    }, 0)
    console.log(`player = ${playerSum} \n dealer = ${dealerSum}`)
    if (dealerSum > 21 && playerSum > 21){
        playerTie();
    } else if (dealerSum > 21){
        playerWin();
    } else if (playerSum > 21){
        playerLose();
    } else if (dealerSum === 21 && playerSum !== 21){
        playerLose();
    } else if (playerSum === 21 && dealerSum !== 21){
        playerWin();
    }else {
        var hit = $('<button>').text('Hit')
        var stand = $('<button>').text('Stand')
        $('body').append(hit, stand)
    }
}
var playerTie = function(){
    console.log(`You tied`)
}
var playerLose = function(){
    console.log(`You lose`)
    
}
var playerWin = function(){
    console.log(`You win`)
    
}



document.getElementById("play-button").addEventListener("click", function(){
    playGame();
})
// document.addEventListener("load", pullDeck());

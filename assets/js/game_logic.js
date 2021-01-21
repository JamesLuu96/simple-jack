var playButtonEl = document.querySelector(".play-button");
let initialValue = 0;
var dealerHand = [];
var playerHand = [];
var urlAddress = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
var deckId=""

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

var pullDeck = function() {fetch(urlAddress)
    .then(function(response){
        response.json().then(function(response) {
            deckId = response.deck_id;
            console.log(dealCard(deckId, 2, dealerHand));
            console.log(dealCard(deckId, 2, playerHand));
            
            // let playerSum = playerHand.reduce(
            //     (accumulator, currentValue) => accumulator + currentValue.value , initialValue
            // )
            // console.log(dealerHand, playerHand, playerSum);
            // localStorage.setItem("deckId", JSON.stringify(response.deck_id));
    })})}



var dealCard = function(deckId, integer, player) {
    // deckId = JSON.parse(localStorage.getItem("deckId"));
    return fetch("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count="+integer)
    .then(function(response){response.json().then(function(response){
        // cardValue = cardValueEvaluate(response.cards[0].code);
        // console.log(cardValue, response.cards[0].code);
        for (let i=0; i<integer; i++) 
            {
             var cardValue = cardValueEvaluate(response.cards[i].code);
            //  console.log(response, response.cards[i].code)
             var cardObj = {
                card: response.cards[i].code,
                value: cardValue
                }
            player.push(cardObj);
            }
        let playerSum = player.reduce(
                (accumulator, currentValue) => accumulator + currentValue.value , 0
            )
        //  console.log(player);
    }
    )
}
);
}
document.getElementById("play-button").addEventListener("click", function(){pullDeck()});
// document.addEventListener("load", pullDeck());

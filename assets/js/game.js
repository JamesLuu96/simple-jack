var deckId;

// player Object
var player = JSON.parse(localStorage.getItem(player)) || 
{ 
    character: 'gambit',
    level: 1,
    maxhp: 100,
    hp: 100,
    hand: [],
    hasAce: false,
    money: 300,
    bet: 0,
    inventory: [],
    mightsum: 0,
    mightproduct: 0
}
// dealer Object
var dealer = JSON.parse(localStorage.getItem(dealer)) || 
{ 
    level: 1,
    maxhp: 100,
    hp: 100,
    hand: [],
    hasAce: false
}

// Fetches New Deck
async function getDeck() {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`)
    const data = await res.json()
    deckId = data.deck_id
}
// Deals Card
async function dealCard(number, hand) {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw?count=${number}`)
    const data = await res.json()
    for (let i = 0; i < integer; i++) {
        var cardValue = cardValueEvaluate(data.cards[i].code, hand);
        var cardObj = {
            card: data.cards[i].code,
            value: cardValue,
            img: data.cards[i].image
        }
        hand.push(cardObj)
    }
    return hand
}
// Evaluates Card's Value
var cardValueEvaluate = function (string, hand) {
    var sum = hand.reduce((x , y) => x.value + y.value)
    // defines cardValue
    switch(string[0]){
        case 'A':
            var cardValue = 1
            if(sum + 11 <= 21){
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
    if (cardValue + sum > 21) {
        //goes through the array, changes all ace values to 1
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].card[0] === "A") {
                hand[i].value = 1;
            }
        }
    }
    return cardValue;
}
// Check Cards
async function checkCards() {

    var sum = player.hand.reduce((x , y) => x.value + y.value)
    if(sum >= 21){
        endGame()
    }else{
        continueGame()
    }

}

async function continueGame(){

    if (bankMoney < (2 * betAmount) || playerHand.length > 2) {
        $('.double').hide()
    } else {
        $('.double').show()
    }
    
}

async function endGame(){
    var playerSum = player.hand.reduce((x , y) => x.value + y.value)
    var dealerSum = dealer.hand.reduce((x , y) => x.value + y.value)
    while (dealerSum < 17) {
        await dealCard(1, dealer.hand);
        dealerSum = dealer.hand.reduce((x , y) => x.value + y.value)
    }
    if(playerSum > 21){
        playerLose()
    }else if(dealerSum > 21){
        playerWin()
    }else if(dealerSum === playerSum){
        playerTie()
    }else if(dealerSum > playerSum){
        playerLose()
    }else{
        playerWin()
    }
}


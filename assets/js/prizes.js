const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=8dc4947cd23a3751e248fa0ac896866f';
{/* <span class="skill" data-tooltip="Health: This unit increases your health by x and heals your hero by x."><span class="oi" data-glyph="heart"></span></span>
<span class="skill" data-tooltip="Might: This unit increases your might by x when winning a battle."><span class="oi" data-glyph="arrow-thick-top"></span></span> */}
// variable to store available character objects and build store pages
var characters = [];
// use this for list of available series and to make initial call to api
const selections = [
  {
    'series': 'Amazing Spider-Man',
    'id': '454'
  },
  {
    'series': 'Black Panther',
    'id': '784'
  },
  {
    'series': 'Blade',
    'id': '1123'
  },
  {
    'series': 'Captain America',
    'id': '1997'
  },
  {
    'series': 'Captain Marvel',
    'id': '16280'
  },
  {
    'series': 'Daredevil',
    'id': '12916'
  },
  {
    'series': 'Deadpool',
    'id': '5701'
  },
  {
    'series': 'Power Man and Iron Fist',
    'id': '21122'
  },
  {
    'series': 'Punisher 2099',
    'id': '20020'
  },
  {
    'series': 'Spider-Verse',
    'id': '18892'
  },
  {
    'series': 'Thor',
    'id': '2473'
  },
  {
    'series': 'Wolverine Origins',
    'id': '2375'
  },
  {
    'series': 'Extraordinary X-Men',
    'id': '20460'
  },
  {
    'series': 'Fantastic Four',
    'id': '16557'
  },
  {
    'series': 'Luke Cage',
    'id': '23045'
  },
  {
    'series': 'Marvel Adventures the Avengers',
    'id': '1107'
  },
  {
    'series': 'New X-Men',
    'id': '749'
  }  
];


// Might Values
var might = [
  {
    might: 2.5,
    mightAdd: true,
    cost: 48
  },
  {
    might: 5,
    mightAdd: true,
    cost: 105
  },
  {
    might: .02,
    mightAdd: false,
    cost: 75
  },
  {
    might: 10,
    mightAdd: true,
    cost: 312
  },
  {
    might: 25,
    mightAdd: true,
    cost: 514
  },
  {
    might: .1,
    mightAdd: false,
    cost: 523
  },
  {
    might: .5,
    mightAdd: false,
    cost: 2110
  }
]
// Health Values
var health = [
  {
    health: 2,
    cost: 26
  },
  {
    health: 5,
    cost: 55
  },
  {
    health: 12,
    cost: 123
  },
  {
    health: 25,
    cost: 580
  },
  {
    health: 55,
    cost: 1510
  }
]

var mightRandom = function(){
  var random = Math.floor((Math.random() * 100) + 1)
  if (random < 20){
    return 0
  } else if (random <= 40){
    return 1
  } else if (random <= 60){
    return 2
  } else if (random <= 75){
    return 3
  } else if (random <= 85){
    return 4
  } else if (random <= 95){
    return 5
  } else {
    return 6
  }
}

var healthRandom = function(){
  var random = Math.floor((Math.random() * 100) + 1)
  if (random <= 20){
    return 0
  } else if(random <= 40){
    return 1
  } else if(random <= 65){
    return 2
  } else if(random <= 90){
    return 3
  } else {
    return 4
  }
}

var randomValues = function(obj){
  // 1 / 100
  var mightOrHealth = Math.floor((Math.random() * 100) + 1)
  const mightNum = mightRandom()
  const healthNum = healthRandom()
  const goodOrBad = Math.floor((Math.random() * 2) + 1)
  const legendary = Math.floor((Math.random() * 50) + 1)
  if(!obj.cost){
    obj.cost = 0
  }

  // 30% Health
  if(mightOrHealth <= 30){
    obj.health = health[healthNum].health
    obj.cost += health[healthNum].cost
  // 50% Might
  } else if (mightOrHealth <= 80){
    obj.might = might[mightNum].might
    obj.mightAdd = might[mightNum].mightAdd
    obj.cost += might[mightNum].cost
  // 20% Both
  } else{
    obj.might = might[mightNum].might
    obj.mightAdd = might[mightNum].mightAdd
    obj.cost += might[mightNum].cost + health[healthNum].cost
    obj.health = health[healthNum].health
  }
  // adds random amount to cost
  if(goodOrBad === 1){
    obj.cost -= Math.floor(Math.random() * 10)
  }else{
    obj.cost += Math.floor(Math.random() * 10)
  }
  // legendary card
  if((legendary < 5 && mightOrHealth > 30) || (legendary < 5 && mightOrHealth > 80)){
    obj.legendary = true
    if(obj.mightAdd){
      var damage = (Math.floor(Math.random() * (100 - 50) + 50)) + 1
      obj.might += damage
      obj.cost += Math.floor(((2000 * (damage * .01))*2.5))
    } else {
      var damage = Math.random() * (10 - 5) + 5
      damage = Math.round(damage*10)/10
      obj.might += damage
      obj.might = Math.round(obj.might*10)/10
      obj.cost += Math.floor((2000 * damage))
    }
  }
  return obj
  
}
// builds character array of objects
async function seriesList() {
  var seriesSearch = 'https://gateway.marvel.com/v1/public/series/';
  var charLimit = 'characters?limit=100';
  // set manual index for each character
  var index = 0;
  // iterate through array for each series
  for (let x = 0; x < selections.length; x++) {

    var response = await fetch(`${seriesSearch}${selections[x].id}/${charLimit}&${apiKey}`);
    var data = await response.json();

    // iterate through each character in each series
    for (let i = 0; i < data.data.results.length; i++) {
      
      var picPath = data.data.results[i].thumbnail.path;
      // prevents characters without distinct pictures from being stored
      if (picPath.includes('image_not_available')) {
        continue;
      } else {
        var character = {
            name: data.data.results[i].name,
            path: data.data.results[i].thumbnail.path,
            ext: data.data.results[i].thumbnail.extension,
            id: data.data.results[i].id,
            series: selections[x].id,
            index: index
        }
        characters.push(character);
        index++
      }
    }
    // saves to localStorage to prevent same user from making multiple api calls
    
  }
  for(let i = 0; i<characters.length; i++){
    characters[i] = randomValues(characters[i])
  }
  localStorage.setItem('characters', JSON.stringify(characters))
  console.log(`Running API Call`)
};

// displays store items based on selected series
function seriesDisplay(value) {
  var filteredArray = characters.filter(x => x.series === value)

  // check if character is unlocked and prevent displaying on store page
  for (let i = 0; i < filteredArray.length; i++) {
    // if (unlockedChars.includes(filteredArray[i])) {
      if (sameName(filteredArray[i].name)) {
    
      // displayed locked characters on store page
    } else {
      var name = filteredArray[i].name;
      var thumbnail = `${filteredArray[i].path}/portrait_uncanny.${filteredArray[i].ext}`
      var container = $('<div>').addClass('shop-item');
      if(filteredArray[i].might && filteredArray[i].health){
        if(filteredArray[i].mightAdd){
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart')), $('<span>').addClass('skill').attr('data-tooltip', `Might: This unit increases your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'arrow-thick-top'))), $('<p>').text(`${filteredArray[i].health}/${filteredArray[i].might}`)))
        } else{
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart')), $('<span>').addClass('skill').attr('data-tooltip', `Might: This unit multiplies your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'x'))), $('<p>').text(`${filteredArray[i].health}/${filteredArray[i].might}`)))
        }

      } else if(filteredArray[i].might){
        if(filteredArray[i].mightAdd){
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Might: This unit increases your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'arrow-thick-top'))), $('<p>').text(`${filteredArray[i].might}`)))
        } else{
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Might: This unit multiplies your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'x'))), $('<p>').text(`${filteredArray[i].might}`)))
        }

      } else {

        container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart'))), $('<p>').text(`${filteredArray[i].health}`)))

      }
      var picture = $('<img>').attr('src', thumbnail);
      container.append(picture)
      var nameEl = $('<h3>').text(`${name}`);
      if(filteredArray[i].legendary){
        nameEl.addClass('legendary')
      }
      var shopItemInfoEl = $('<div>').addClass('shop-item-info').append(nameEl, $('<p>').text(filteredArray[i].cost).prepend($('<span>').addClass('oi').attr('data-glyph', 'flash')))
      if (bankMoney >= filteredArray[i].cost){
        shopItemInfoEl.append($('<button>').addClass('btn-green unlock-card').text('Unlock').attr('data-index', filteredArray[i].index))
      } else {
        shopItemInfoEl.append($('<button>').addClass('btn-red unlock-card').text('Unlock').attr('data-index', filteredArray[i].index))
      }
      container.append(shopItemInfoEl)
      $('.shop-container').append(container);
    }
  }
};

// refresh store page and call function to display currently selected series
$('.series').on('change', function(event) {
  var value = event.target.value;
  $('.shop-container').empty();
  seriesDisplay(value);
})

// set unlocked character in localStorage and global variable
$('.shop-container').on('click', '.unlock-card', function(event) {
  var cost = characters[event.target.getAttribute('data-index')].cost
  if (bankMoney >= cost) {
    bankMoney -= cost
    unlockedChars.push(characters[event.target.getAttribute('data-index')]);
    localStorage.setItem('unlockedChars', JSON.stringify(unlockedChars));
    $('.series').trigger('change');
    $('.navbar p').text(bankMoney)
  } else {
    alert('You don\'t have enough money');
  }
})

// check if api call needs to run or set characters from localStorage
if (localStorage.getItem('characters') === null) {
  seriesList();
} else {
  characters = JSON.parse(localStorage.getItem('characters'))
}

// set empty array or retrieve unlocked characters from localStorage
// if (localStorage.getItem('unlockedChars') === null) {
//   var unlockedChars = [];
// } else {
//   var temp = JSON.parse(localStorage.getItem('unlockedChars'));
//   var unlockedChars = [];
//   for (let i = 0; i < temp.length; i++) {
//     unlockedChars.push(characters[temp[i].index])
//   }
// }
var unlockedChars = JSON.parse(localStorage.getItem('unlockedChars')) || []
var sameName = function(name){
  var found = false;
  for(var i = 0; i < unlockedChars.length; i++) {
      if (unlockedChars[i].name == name) {
          found = true;
          break;
      }
  }
  
  return found
}
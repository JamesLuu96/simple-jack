const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=6183cc1410bb4bd83659bc716cd7fadb';
// 6183cc1410bb4bd83659bc716cd7fadb
// 8dc4947cd23a3751e248fa0ac896866f
{/* <span class="skill" data-tooltip="Health: This unit increases your health by x and heals your hero by x."><span class="oi" data-glyph="heart"></span></span>
<span class="skill" data-tooltip="Might: This unit increases your might by x when winning a battle."><span class="oi" data-glyph="plus"></span></span> */}
// variable to store available character objects and build store pages
// use this for list of available series and to make initial call to api
const selections = ['116', '227', '238', '271']


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

var mightRandom = function () {
  var random = Math.floor((Math.random() * 100) + 1)
  if (random < 20) {
    return 0
  } else if (random <= 40) {
    return 1
  } else if (random <= 60) {
    return 2
  } else if (random <= 75) {
    return 3
  } else if (random <= 85) {
    return 4
  } else if (random <= 95) {
    return 5
  } else {
    return 6
  }
}

var healthRandom = function () {
  var random = Math.floor((Math.random() * 100) + 1)
  if (random <= 20) {
    return 0
  } else if (random <= 40) {
    return 1
  } else if (random <= 65) {
    return 2
  } else if (random <= 90) {
    return 3
  } else {
    return 4
  }
}

var randomValues = function (obj) {
  // 1 / 100
  var mightOrHealth = Math.floor((Math.random() * 100) + 1)
  const mightNum = mightRandom()
  const healthNum = healthRandom()
  const goodOrBad = Math.floor((Math.random() * 2) + 1)
  const legendary = Math.floor((Math.random() * 50) + 1)
  if (!obj.cost) {
    obj.cost = 0
  }

  // 30% Health
  if (mightOrHealth <= 30) {
    obj.health = health[healthNum].health
    obj.cost += health[healthNum].cost
    // 50% Might
  } else if (mightOrHealth <= 80) {
    obj.might = might[mightNum].might
    obj.mightAdd = might[mightNum].mightAdd
    obj.cost += might[mightNum].cost
    // 20% Both
  } else {
    obj.might = might[mightNum].might
    obj.mightAdd = might[mightNum].mightAdd
    obj.cost += might[mightNum].cost + health[healthNum].cost
    obj.health = health[healthNum].health
  }
  // adds random amount to cost
  if (goodOrBad === 1) {
    obj.cost -= Math.floor(Math.random() * 10)
  } else {
    obj.cost += Math.floor(Math.random() * 10)
  }
  // legendary card
  if ((legendary < 5 && mightOrHealth > 30) || (legendary < 5 && mightOrHealth > 80)) {
    obj.legendary = true
    if (obj.mightAdd) {
      var damage = (Math.floor(Math.random() * (100 - 50) + 50)) + 1
      obj.might += damage
      obj.cost += Math.floor(((2000 * (damage * .01)) * 2.5))
    } else {
      var damage = Math.random() * (10 - 5) + 5
      damage = Math.round(damage * 10) / 10
      obj.might += damage
      obj.might = Math.round(obj.might * 10) / 10
      obj.cost += Math.floor((2000 * damage))
    }
  }
  return obj

}
// builds character array of objects
async function seriesList() {
  var seriesSearch = 'https://gateway.marvel.com/v1/public/events/';
  // set manual index for each character
  var index = 0;
  // iterate through array for each series
  for (let x = 0; x < selections.length; x++) {

    var response = await fetch(`${seriesSearch}${selections[x]}/characters?${apiKey}&limit=100`);
    var data = await response.json();

    // iterate through each character in each series
    for (let i = 0; i < data.data.results.length; i++) {

      var picPath = data.data.results[i].thumbnail.path;
      // prevents characters without distinct pictures from being stored
      if (picPath.includes('image_not_available')) {
        continue;
      } else {
        var path = data.data.results[i].thumbnail.path
        path = path.substring(0, 4) + 's' + path.substring(4, path.length)
        var character = {
          name: data.data.results[i].name,
          path: path,
          ext: data.data.results[i].thumbnail.extension,
          id: data.data.results[i].id,
          series: selections[x],
          index: index,
          description: data.data.results[i].description,
          url: data.data.results[i].urls[1].url
        }
        if(path === 'https://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'){
          character.path = `https://upload.wikimedia.org/wikipedia/en/2/2d/XMEN_Synch`
          character.ext = `jpg`
        }
        characters.push(character);
        index++
      }
    }
    // saves to localStorage to prevent same user from making multiple api calls
    
  }
  for (let i = 0; i < characters.length; i++) {
    characters[i] = randomValues(characters[i])
  }
  localStorage.setItem('characters', JSON.stringify(characters))
};

// displays store items based on selected series
function seriesDisplay(value) {
  var filteredArray = characters.filter(x => x.series === value)
  $('.form-filter input').each(function () {
    var name = $(this)[0].id
    if($(this)[0].checked){
      if(name === 'filter-health'){
        filteredArray = filteredArray.filter(x=>x.health)
        
      } else if(name === 'filter-mightAdd'){
        filteredArray = filteredArray.filter(x=>x.mightAdd)
        
      } else if(name === 'filter-mightMultiply'){
        filteredArray = filteredArray.filter(x=>x.might).filter(x=>!x.mightAdd)
        
      } else if(name === 'filter-legendary'){
        filteredArray = filteredArray.filter(x=>x.legendary)
      } else if(name === 'filter-down'){
        filteredArray = filteredArray.sort((a,b)=>a.cost-b.cost)
      } else if(name === 'filter-up'){
        filteredArray = filteredArray.sort((a,b)=>b.cost-a.cost)
      }
    }
  })
  display(filteredArray)
}
function display(filteredArray) {
  // check if character is unlocked and prevent displaying on store page
  for (let i = 0; i < filteredArray.length; i++) {
    // if (player.inventory.includes(filteredArray[i])) {
    if (sameName(filteredArray[i])) {
      continue
      // displayed locked characters on store page
    } else {
      var name = filteredArray[i].name;
      if(filteredArray[i].path === `https://upload.wikimedia.org/wikipedia/en/2/2d/XMEN_Synch`){
        var thumbnail = `${filteredArray[i].path}.${filteredArray[i].ext}`
      }else{
        var thumbnail = `${filteredArray[i].path}/portrait_uncanny.${filteredArray[i].ext}`
      }

      var container = $('<div>').addClass('shop-item');
      if (filteredArray[i].might && filteredArray[i].health) {
        if (filteredArray[i].mightAdd) {
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart')), $('<span>').addClass('skill').attr('data-tooltip', `Might: This unit increases your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'plus'))), $('<p>').text(`${filteredArray[i].health}/${filteredArray[i].might}`)))
        } else {
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart')), $('<span>').addClass('skill').attr('data-tooltip', `Might: This unit multiplies your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'x'))), $('<p>').text(`${filteredArray[i].health}/${filteredArray[i].might}`)))
        }

      } else if (filteredArray[i].might) {
        if (filteredArray[i].mightAdd) {
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Might: This unit increases your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'plus'))), $('<p>').text(`${filteredArray[i].might}`)))
        } else {
          container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Might: This unit multiplies your might by ${filteredArray[i].might} when fighting a battle. (Rounded Down)`).append($('<span>').addClass('oi').attr('data-glyph', 'x'))), $('<p>').text(`${filteredArray[i].might}`)))
        }

      } else {

        container.append($('<div>').append($('<div>').append($('<span>').addClass('skill').attr('data-tooltip', `Health: This unit increases your maximum health by ${filteredArray[i].health} and heals you by ${filteredArray[i].health} everytime you win a battle.`).append($('<span>').addClass('oi').attr('data-glyph', 'heart'))), $('<p>').text(`${filteredArray[i].health}`)))

      }
      var pictureContainerEl = $('<div>').addClass('shop-item-picture')
      var nameEl = $('<h3>').text(`${name}`);
      var picture = $('<img>').attr('src', thumbnail);
      if(filteredArray[i].url){
        var linkEl = $('<a>').attr('href', filteredArray[i].url).attr('target', '_blank')
        linkEl.append(picture)
        pictureContainerEl.append(linkEl)
      } else{
        pictureContainerEl.append(picture)
      }
      container.append(pictureContainerEl)
      
      if (filteredArray[i].legendary) {
        nameEl.addClass('legendary')
      }
      if(filteredArray[i].description){
        var descriptionEl = $('<span>').addClass('skill').attr('data-tooltip', filteredArray[i].description).append($('<i>').addClass('fa fa-info-circle').attr('aria-hidden', 'true'))
        var shopItemInfoEl = $('<div>').addClass('shop-item-info').append(nameEl, descriptionEl, $('<p>').text(filteredArray[i].cost).prepend($('<span>').addClass('oi').attr('data-glyph', 'flash')))
      }else{
        var shopItemInfoEl = $('<div>').addClass('shop-item-info').append(nameEl, $('<p>').text(filteredArray[i].cost).prepend($('<span>').addClass('oi').attr('data-glyph', 'flash')))
      }
      if (player.money >= filteredArray[i].cost){
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
$('.series').on('change', function (event) {
  var value = event.target.value;
  $('.shop-container').empty();
  seriesDisplay(value);
})

// set unlocked character in localStorage and global variable
$('.shop-container').on('click', '.unlock-card', function (event) {
  var cost = characters[event.target.getAttribute('data-index')].cost
  if (player.money >= cost) {
    player.money -= cost
    player.inventory.push(characters[event.target.getAttribute('data-index')]);
    updateStats()
    if (characters[event.target.getAttribute('data-index')].health) {
      player.maxHp += characters[event.target.getAttribute('data-index')].health
    }
    $('.shop-container').empty();
    seriesDisplay($('.series').val())
    $('.navbar p').text(player.money)
  } else {
    unlockErrorMessage();
  }
  saveGame()
})


$('.form-filter').on('change', $('input'), function (event) {
  event.preventDefault()
  
  $('.shop-container').empty();
  seriesDisplay($('.series').val());
})


var sameName = function (filteredArray) {
  var found = false;
  for (var i = 0; i < player.inventory.length; i++) {
    if (player.inventory[i].name == filteredArray.name) {
      found = true;
      break;
    }
  }

  return found
}

function showMyItems() {
  $('.inventory-box').text('')
  
  if (player.inventory.length === 0) {
    var message = $('<p>').text("You have no characters.").addClass("notification  is-light")
    $('.inventory-box').append(message)
  } else {
    for (var i = 0; i < player.inventory.length; i++) {
      var name = player.inventory[i].name
      var ext = player.inventory[i].ext
      var path = player.inventory[i].path
      var itemContainerEl = $('<div>').addClass('myItems-container')
      var itemImage = $('<img>').attr('src', path + "." + ext).addClass('myItems-img')
      var itemHeader = $('<h4>').text(name).addClass('inventory-header')
      if (player.inventory[i].legendary) {
        itemHeader.addClass('legendary')
      }
      $(itemContainerEl).append(itemImage, itemHeader)


      var skillsEl = $('<div>').addClass('is-flex')

      if (player.inventory[i].health) {
        var spanEl = $('<span>').append($('<span>').addClass('oi').attr('data-glyph', 'heart'))
        var value = $('<p>').text(player.inventory[i].health)
        skillsEl.append($('<div>').append(spanEl, value).addClass('is-flex'))
      }
      if (player.inventory[i].mightAdd) {
        var spanEl = $('<span>').append($('<span>').addClass('oi').attr('data-glyph', 'plus'))
        var value = $('<p>').text(player.inventory[i].might)
        skillsEl.append($('<div>').append(spanEl, value).addClass('is-flex'))
      }
      if (player.inventory[i].might && !player.inventory[i].mightAdd) {
        var spanEl = $('<span>').append($('<span>').addClass('oi').attr('data-glyph', 'x'))
        var value = $('<p>').text(player.inventory[i].might)
        skillsEl.append($('<div>').append(spanEl, value).addClass('is-flex'))
      }
      $(itemContainerEl).prepend(skillsEl)
      $('.inventory-box').append($(itemContainerEl))
    }
  }
}


var updateStats = function () {
  player.mightSum = 0
  player.mightProduct = 1
  player.healAmount = 0
  for (let i = 0; i < player.inventory.filter(x => x.might).length; i++) {
    if (player.inventory.filter(x => x.might)[i].mightAdd) {
      player.mightSum += player.inventory.filter(x => x.might)[i].might
    } else {
      player.mightProduct += player.inventory.filter(x => x.might)[i].might
    }
  }
  for (let i = 0; i < player.inventory.filter(x => x.health).length; i++) {
    player.healAmount += player.inventory.filter(x => x.health)[i].health
  }
}

//search characters
function searchItems(searchItem) {
  var filterArray = []
  searchItem = searchItem.toLowerCase()
  for (var i = 0; i < characters.length; i++) {
    if ((searchItem.toLowerCase() === characters[i].name.toLowerCase()) || (characters[i].name.toLowerCase().slice(0, searchItem.length) === searchItem)) {
      filterArray.push(characters[i])
    }
  }
  if (filterArray.length == 0) {
    $('.shop-container').empty()
    var messagediv = $('<div>').addClass('notification is-primary is-light')
    var message = $('<p>').text('oops your character is not available')
    messagediv.append(message)
    $('.shop-container').append(messagediv)
  } else {
    $('.shop-container').empty()
    display(filterArray)
  }

}
$('#search').autocomplete({
  source: noDuplicate(characters.map(x => x.name))
})


function noDuplicate(a) {
  a = a.filter(function (item, pos) {
    return a.indexOf(item) == pos;
  })
  return a
}

$('.nav-inventory').on('click', function () {
  $('.modal-inventory').addClass('is-active')
  showMyItems(player.inventory)
})
$('#inventory-close').on('click', function () {
  $('.modal-inventory').removeClass('is-active')
})

function unlockErrorMessage() {
  $('.modal-unlock-message').addClass('is-active')
}

$('.nav-search').on('submit', function (event) {
  event.preventDefault()
  var searchItem = $('#search').val()
  var regex = /^[A-Za-z0-9-,() ]+$/
  var isValid = regex.test(searchItem);
  if (!isValid || searchItem == '') {
    $('.shop-container').empty()
    var message = $('<p>').text('Please provide a valid input').addClass('notification is-danger is-light')
    $('.shop-container').append(message)
  } else {
    searchItems(searchItem)
    $('#search').val('')
  }
})




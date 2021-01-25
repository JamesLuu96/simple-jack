const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=8dc4947cd23a3751e248fa0ac896866f';
// stores available characters
var characters = [];
// stores unlocked characters in local storage
var temp = [];

// use this for list of available series and to make calls to api
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

// builds character array
async function seriesList() {
  var seriesSearch = 'https://gateway.marvel.com/v1/public/series/';
  var charLimit = 'characters?limit=100';
  var index = 0;
  for (let x = 0; x < selections.length; x++) {

    var response = await fetch(`${seriesSearch}${selections[x].id}/${charLimit}&${apiKey}`);
    var data = await response.json();
    // debugger
    for (let i = 0; i < data.data.results.length; i++) {
      
      var picPath = data.data.results[i].thumbnail.path;
      
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
    console.log('getting data from API call')
    localStorage.setItem('characters', JSON.stringify(characters))
  }
};

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}
function seriesDisplay(value) {
  var filteredArray = characters.filter(x => x.series === value)
  console.log(filteredArray)

  // TODO: change to loop through filteredArray
  for (let i = 0; i < filteredArray.length; i++) {
    if (unlockedChars.includes(filteredArray[i])) {
    
    } else {
      var name = (filteredArray[i].name);
      var picPath = filteredArray[i].path;
      var picExtension = filteredArray[i].ext;
  
      var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
      var container = $('<div>');
      var listItem = $('<p>').text(`${name}`);
      var picture = $('<img>').attr('src', thumbnail);
      container.append(listItem);
      container.append(picture);
      var buttonContainer = $('<div>');
      // create button with id of character
      var button = $('<button>').addClass('button is-success unlock-card').attr('id', filteredArray[i].index).attr('title', 'you need 500 points').text('Unlock');
      buttonContainer.append(button);
      container.append(buttonContainer);
      $('.shop-container').append(container);
    }
    // debugger
  }
};

$('.series').on('change', function(event) {

  var value = event.target.value;
  $('.shop-container').empty();
  seriesDisplay(value);
})

// TODO: target unlock button to add character to localStorage
$('.shop-container').on('click', '.unlock-card', function(event) {
  console.log(event.target)

  if (bankMoney >= 10) {
    var pullId = event.target.id;
    unlockedChars.push(characters[pullId]);
    localStorage.setItem('unlockedChars', JSON.stringify(unlockedChars));
    $('.series').trigger('change');
  } else {
    alert('You don\'t have enough money');
  }
  console.log(unlockedChars)
})

function test() {
  for (let i = 0; i < selections.length; i++) {
    for (let j = 0; j < 20; j++) {
      console.log(selections[i].id)
    }
  }
}


if (localStorage.getItem('characters') === null) {
  seriesList();
} else {
  characters = JSON.parse(localStorage.getItem('characters'))
}

if (localStorage.getItem('unlockedChars') === null) {
  var unlockedChars = [];
} else {
  var temp = JSON.parse(localStorage.getItem('unlockedChars'));
  var unlockedChars = [];
  for (let i = 0; i < temp.length; i++) {
    unlockedChars.push(characters[temp[i].index])
  }
}
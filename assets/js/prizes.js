const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=8dc4947cd23a3751e248fa0ac896866f';
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
        var might = Math.floor(Math.random() * (31 - 1) + 1);
        if (might < 6) {
          cost = 300;
        } else if (might < 11) {
          cost = 600;
        } else if (might < 16) {
          cost = 900;
        } else if (might < 21) {
          cost = 1200;
        } else if (might < 26) {
          cost = 1500;
        } else if (might < 31) {
          cost = 1800;
        }
        var character = {
            name: data.data.results[i].name,
            path: data.data.results[i].thumbnail.path,
            ext: data.data.results[i].thumbnail.extension,
            id: data.data.results[i].id,
            series: selections[x].id,
            index: index,
            might: might,
            cost: cost
        }
        characters.push(character);
        index++
      }
    }
    // saves to localStorage to prevent same user from making multiple api calls
    localStorage.setItem('characters', JSON.stringify(characters))
  }
};

// displays store items based on selected series
function seriesDisplay(value) {
  var filteredArray = characters.filter(x => x.series === value)

  // check if character is unlocked and prevent displaying on store page
  for (let i = 0; i < filteredArray.length; i++) {
    if (unlockedChars.includes(filteredArray[i])) {
    
      // displayed locked characters on store page
    } else {
      var name = filteredArray[i].name;
      var picPath = filteredArray[i].path;
      var picExtension = filteredArray[i].ext;
  
      var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
      var container = $('<div>');
      var listItem = $('<p>').text(`${name}`);
      var picture = $('<img>').attr('src', thumbnail);
      var might = $('<p>').text(`Might: ${filteredArray[i].might}`);
      container.append(listItem);
      container.append(picture);
      container.append(might);
      var buttonContainer = $('<div>').addClass('unlock-card');
      // create button with id of character
      var button = $('<button>').addClass('button is-success unlock-char').attr('id', filteredArray[i].index).attr('title', `You need ${filteredArray[i].cost} to purchase`).text(`Cost: ${filteredArray[i].cost}`);
      buttonContainer.append(button);
      container.append(buttonContainer);
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
$('.shop-container').on('click', '.unlock-char', function(event) {
  var pullId = event.target.id;
  var cost = characters[pullId].cost;
  if (bankMoney >= cost) {
    unlockedChars.push(characters[pullId]);
    localStorage.setItem('unlockedChars', JSON.stringify(unlockedChars));
    $('.series').trigger('change');
    bankMoney -= cost
  } else {
    alert(`You need ${cost} to purchase this character!`);
  }
})

// check if api call needs to run or set characters from localStorage
if (localStorage.getItem('characters') === null) {
  seriesList();
} else {
  characters = JSON.parse(localStorage.getItem('characters'))
}

// set empty array or retrieve unlocked characters from localStorage
if (localStorage.getItem('unlockedChars') === null) {
  var unlockedChars = [];
} else {
  var temp = JSON.parse(localStorage.getItem('unlockedChars'));
  var unlockedChars = [];
  for (let i = 0; i < temp.length; i++) {
    unlockedChars.push(characters[temp[i].index])
  }
}
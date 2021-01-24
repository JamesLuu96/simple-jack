const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=6183cc1410bb4bd83659bc716cd7fadb';
// stores available characters
var characters = [];
// stores unlocked characters in local storage
var unlockedChars = localStorage.getItem('characterId') || [];
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

// TODO: check available characters against unlocked characters
function checkCharacters() {

  if (unlockedChars.includes(name)) {
    return;
  } else {
    localStorage.setItem('unlockedChars', name)
  }
};

// builds character array
async function seriesList() {
  var seriesSearch = 'https://gateway.marvel.com/v1/public/series/';
  var charLimit = 'characters?limit=100';

  for (let i = 0; i < selections.length; i++) {

    var response = await fetch(`${seriesSearch}/${selections[i].id}/${charLimit}&${apiKey}`);
    var data = await response.json();

    for (let i = 0; i < data.data.results.length; i++) {

      var picPath = data.data.results[i].thumbnail.path;

      if (picPath.includes('image_not_available')) {
        continue;
      } else {
        // TODO: filter duplicates
        characters.push(data.data.results[i].id);
      }
    }
  }
};


function pageBuild() {
  // create select box
  var selectBox = $('<select>');
  // pull bankMoney from game_logic.js to display available funds in shop
  $('#shop-money').text(`Available Funds: ${bankMoney}`)
  
  // populate options for select box
  for (let i = 0; i < selections.length; i++) {
    var option = $('<option>').attr('value', selections[i].id).text(selections[i].series);
    selectBox.append(option);
  }

  // append select box with options
  $('#select-box').append(selectBox);
  seriesDisplay();
};

async function seriesDisplay() {
  var charSearch = '/v1/public/characters/';
  
  for (let i = 0; i < characters.length; i++) {
    
    var response = await fetch(`${gateway}${charSearch}${characters[i]}?${apiKey}`);
    var data = await response.json();
    var name = (data.data.results[0].name);
    var picPath = data.data.results[0].thumbnail.path;
    var picExtension = data.data.results[0].thumbnail.extension;

    var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
    var container = $('<div>');
    var listItem = $('<p>').text(`${name}`);
    var picture = $('<img>').attr('src', thumbnail);
    container.append(listItem);
    container.append(picture);
    var buttonContainer = $('<div>').addClass('unlock-card');
    var button = $('<button>').addClass('button is-success').attr('title', 'you need 200 points').text('Unlock');
    buttonContainer.append(button);
    container.append(buttonContainer);
    $('.shop-container').append(container);
    // debugger
  }
};

// display series based on option selection (default is Amazing Spider-Man)
// async function seriesDisplay(value) {
//   // API limits query results to 100 and defaults to 20 unless otherwise specified
//   var seriesComp = '/v1/public/series/454/characters?limit=100';
//   // clear previous series
//   $('.shop-container').empty()
//   // will skip on initial page load and load default series list
//   if (value) {
//     seriesComp = seriesComp.replace('454', value);
//     console.log(seriesComp)
//   }

//   var response = await fetch(`${gateway}${seriesComp}${apiKey}`);
//   var data = await response.json();
//   // debugger

//   for (let i = 0; i < data.data.results.length; i++) {
//     // console.log(data)
//     var name = (data.data.results[i].name);
//     var picPath = data.data.results[i].thumbnail.path;
//     var picExtension = data.data.results[i].thumbnail.extension;
//     if (picPath.includes('image_not_available')) {
//       continue;
//     } else {
//       var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
//       var container = $('<div>');
//       var listItem = $('<p>').text(`${name}`);
//       var picture = $('<img>').attr('src', thumbnail);
//       container.append(listItem);
//       container.append(picture);
//       if (bankMoney >= 200) {
//         var buttonContainer = $('<div>').addClass('unlock-card');
//         var button = $('<button>').addClass('button is-success').attr('title', 'you need 200 points').text('Unlock');
//         buttonContainer.append(button);
//         container.append(buttonContainer);
//       } else {
//         var notEnough = $('<p>').text('You don\'t have enough points');
//         container.append(notEnough)
//       }

//       $('.shop-container').append(container);
//     }
//   }
  
//   // checks array length and calls new fetch to pull rest of results for series
//   if (data.data.results.length === 100) {
//     seriesComp += '&offset=100';
//     fetch(`${gateway}${seriesComp}${apiKey}`).then(function(response) {
//       response.json().then(function(data) {
//         for (let i = 0; i < data.data.results.length; i++) {
//           var name = (data.data.results[i].name);
//           var picPath = data.data.results[i].thumbnail.path;
//           var picExtension = data.data.results[i].thumbnail.extension;
//           if (picPath.includes('image_not_available')) {
//             continue;
//           } else {
//             var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
//             var container = $('<div>');
//             var listItem = $('<p>').text(`${name}`);
//             var picture = $('<img>').attr('src', thumbnail);
//             container.append(listItem);
//             container.append(picture);
//             var buttonContainer = $('<div>').addClass('unlock-card');
//             var button = $('<button>').addClass('button is-success').attr('title', 'you need 200 points').text('Unlock');
//             buttonContainer.append(button);
//             container.append(buttonContainer);

//             $('.shop-container').append(container);
//           }
//         }
//       })
//     })
//   }
// };

$('#select-box').change((event) => {

  var value = event.target.value;
  seriesDisplay(value);
})

// TODO: target unlock button to add character to localStorage
$('.unlock-card').click(function(event) {
  var name = $('.unlock-card')
  console.log(event)
})

seriesList();
pageBuild();
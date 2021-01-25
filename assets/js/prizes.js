const gateway = 'https://gateway.marvel.com';
const apiKey = 'apikey=8dc4947cd23a3751e248fa0ac896866f';
// stores available characters
var characters = [];
// stores unlocked characters in local storage
var unlockedChars = localStorage.getItem('id') || [];
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
// function checkCharacters() {

//   if (unlockedChars.includes(characters)) {
//     continue;
//   } else {

//   }
// };

// builds character array
async function seriesList() {
  var seriesSearch = 'https://gateway.marvel.com/v1/public/series/';
  var charLimit = 'characters?limit=100';

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
            series: selections[x].id
        }
        characters.push(character);
      }
    }
  }
  console.log(characters)
};

// get rid of and make html select box

// function pageBuild() {
//   // create select box
//   var selectBox = $('<select>');
//   // pull bankMoney from game_logic.js to display available funds in shop
//   $('#shop-money').text(`Available Funds: ${bankMoney}`)
  
//   // populate options for select box
//   for (let i = 0; i < selections.length; i++) {
//     var option = $('<option>').attr('value', selections[i].id).text(selections[i].series);
//     selectBox.append(option);
//   }

//   // append select box with options
//   $('#select-box').append(selectBox);
//   seriesDisplay();
// };

function seriesDisplay(value) {
  var filteredArray = characters.filter(x => x.series === value)

  // TODO: change to loop through filteredArray
  for (let i = 0; i < filteredArray.length; i++) {

    var name = (filteredArray[i].name);
    var picPath = filteredArray[i].path;
    var picExtension = filteredArray[i].ext;

    var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
    var container = $('<div>');
    var listItem = $('<p>').text(`${name}`);
    var picture = $('<img>').attr('src', thumbnail);
    container.append(listItem);
    container.append(picture);
    var buttonContainer = $('<div>').addClass('unlock-card');
    // create button with id of character
    var button = $('<button>').addClass('button is-success').attr('id', characters[i]).attr('title', 'you need 500 points').text('Unlock');
    buttonContainer.append(button);
    container.append(buttonContainer);
    $('.shop-container').append(container);
    // debugger
  }
};

$('.series').on('change', function(event) {

  var value = event.target.value;
  $('.shop-container').empty();
  seriesDisplay(value);
})

// TODO: target unlock button to add character to localStorage
$('.unlock-card').click(function(event) {
  if (bankMoney >= 500) {
    var pullId = event.target.id
    unlockedChars = localStorage.setItem('id', pullId)
    checkCharacters();
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

// test();

seriesList();
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
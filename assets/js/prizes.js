const gateway = 'https://gateway.marvel.com';
const apiKey = '&apikey=6183cc1410bb4bd83659bc716cd7fadb';
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
console.log(bankMoney)
// TODO: check available characters against unlocked characters

function pageBuild() {
  // create select box
  var selectBox = $('<select>');
  
  // populate options for select box
  for (let i = 0; i < selections.length; i++) {
    var option = $('<option>').attr('value', selections[i].id).text(selections[i].series);
    selectBox.append(option);
  }

  // append select box with options
  $('#select-box').append(selectBox);
  seriesDisplay();
};

// display series based on option selection (default is Amazing Spider-Man)
async function seriesDisplay(value) {
  // API limits query results to 100 and defaults to 20 unless otherwise specified
  var seriesComp = '/v1/public/series/454/characters?limit=100';
  // clear previous series
  $('.shop-container').empty()
  // will skip on initial page load and load default series list
  if (value) {
    seriesComp = seriesComp.replace('454', value);
    console.log(seriesComp)
  }

  var response = await fetch(`${gateway}${seriesComp}${apiKey}`);
  var data = await response.json();
  // debugger

  for (let i = 0; i < data.data.results.length; i++) {
    console.log("I'm in for loop")
    var name = (data.data.results[i].name);
    var picPath = data.data.results[i].thumbnail.path;
    var picExtension = data.data.results[i].thumbnail.extension;
    if (picPath.includes('image_not_available')) {
      continue;
    } else {
      var thumbnail = `${picPath}/portrait_uncanny.${picExtension}`
      var container = $('<div>');
      var listItem = $('<p>').text(`${name}`);
      var picture = $('<img>').attr('src', thumbnail);
      container.append(listItem);
      container.append(picture);
      if (bankMoney >= 200) {
        var buttonContainer = $('<div>').addClass('unlock-card');
        var button = $('<button>').addClass('button is-success').attr('title', 'you need 200 points').text('Unlock');
        buttonContainer.append(button);
        container.append(buttonContainer);
      } else {
        var notEnough = $('<p>').text('You don\'t have enough points');
        container.append(notEnough)
      }

      $('.shop-container').append(container);
    }
  }
  
  // checks array length and calls new fetch to pull rest of results for series
  if (data.data.results.length === 100) {
    seriesComp += '&offset=100';
    fetch(`${gateway}${seriesComp}${apiKey}`).then(function(response) {
      response.json().then(function(data) {
        for (let i = 0; i < data.data.results.length; i++) {
          var name = (data.data.results[i].name);
          var picPath = data.data.results[i].thumbnail.path;
          var picExtension = data.data.results[i].thumbnail.extension;
          if (picPath.includes('image_not_available')) {
            continue;
          } else {
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
          }
        }
      })
    })
  }
};

// add pictures to local array of objects

$('#select-box').change((event) => {

  var value = event.target.value;
  seriesDisplay(value);
})

pageBuild();
// throw away - just to pull the list of series, IDs, and available characters

// Amazing Spider-Man (1999 - 2013) - series 454	- total characters 145
// Black Panther (2005 - 2008) - series 784	- total characters	31
// Blade (2006 - 2007) - series 1123	- total characters	5
// Captain America (1998 - 2002) - series 1997	- total characters	31
// Captain Marvel (2012 - 2013) - series 16280	- total characters	1
// Daredevil (2011 - 2014) - series 12916	- total characters  12
// Deadpool (2008 - 2012) - series 5701	- total characters	15
// Power Man and Iron Fist (2016 - 2017) - series 21122	- total characters	7
// Punisher 2099 (1993) - series 20020	- total characters	2
// Spider-Verse (2014 - 2015) - series 18892	- total characters	4
// Thor (2007 - 2011) - series 2473	- total characters	12
// Wolverine Origins (2006 - 2010) - series 2375	- total characters	41
// Extraordinary X-Men (2015 - 2017) - series 20460	- total characters	8
// Fantastic Four (2012 - 2014) - series 16557	- total characters	7
// Luke Cage (2017 - 2018) - series 23045	- total characters	2
// Marvel Adventures the Avengers (2006 - 2009) - series 1107	- total characters	10
// New X-Men (2004 - 2008) - series 749	- total characters	29
// total characters from all series	362

// async function testFunction1() {

//   var response = await fetch(`${gateway}${seriesComp}&offset=100${apiKey}`)
//   var data = await response.json()
//         // debugger

        
//         for (let i = 0; i < 100; i++) {
//           var title = data.data.results[i].title;
//           var id = data.data.results[i].id;
//           var characters = data.data.results[i].characters.available;
//           var listItem = $('<p>').text(`${title} - ${id} - ${characters}`)
//           $('#test').append(listItem);
//         }
// };

// async function testFunction2() {

//   var response = await fetch(`${gateway}${seriesComp}&offset=200${apiKey}`)
//   var data = await response.json()
//         // debugger

        
//         for (let i = 0; i < 100; i++) {
//           var title = data.data.results[i].title;
//           var id = data.data.results[i].id;
//           var characters = data.data.results[i].characters.available;
//           var listItem = $('<p>').text(`${title} - ${id} - ${characters}`)
//           $('#test').append(listItem);
//         }
// };
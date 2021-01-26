var mySong;
// Default Theme
const defaultSong = new Audio()
defaultSong.loop = true
defaultSong.src = `./assets/audio/main-menu.mp3`
var mute = 1

// If no song in localStorage
if(localStorage.getItem(mySong) === null){
    localStorage.setItem('mySong', defaultSong)
    mySong = defaultSong
} else {
    mySong = localStorage.getItem('mySong')
}

async function playSong(song) {
    song.volume = 1
    await song.play()
}

var stopSong = function (song) {
    song.pause()
}

var lowerSong = function (song) {
    song.volume = 0.2;
}

// Mute Button
$('.mute').on('click', function(){
    if(mute === 1){
        lowerSong(mySong)
        $('.mute').attr('data-glyph', 'volume-low')
    } else if (mute === 2){
        stopSong(mySong)
        $('.mute').attr('data-glyph', 'volume-off')
    } else{
        playSong(mySong)
        $('.mute').attr('data-glyph', 'volume-high')
    }

    mute++
    if(mute > 3){
        mute = 0
    }
})

// Joker / Gambit audio

var randomAudio = function(audioArr){
    var random = Math.floor(Math.random() * audioArr.length)
    audioArr[random].audio()
}

var playerWinAudio = [
    {audio: function(){
        $('#dealer-text p').text(`You're takin' the fun outta this!`)
        $('#player-text p').text(`Come on, mon ami.`)
        var joker = new Audio()
        var gambit = new Audio()
        joker.src = './assets/audio/Joker/joker-lose.wav'
        gambit.src = './assets/audio/Gambit/gambit-win.wav'
        joker.play()
        $('#dealer-text').show()
        joker.onended = function(){
            gambit.play()
            $('#player-text').show()
        }
    }},
    {audio: function(){
        $('#dealer-text p').text(`We'll just have to try again.`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-lose2.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`We're almost done here...`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-lose3.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`You're takin' the fun outta this!`)
        $('#player-text p').text(`Don't mess.. With the cajun'`)
        var joker = new Audio()
        var gambit = new Audio()
        joker.src = './assets/audio/Joker/joker-lose.wav'
        gambit.src = './assets/audio/Gambit/gambit-win2.wav'
        gambit.play()
        $('#player-text').show()
        gambit.onended = function(){
            joker.play()
            $('#dealer-text').show()
        }
    }}
]

var playerLoseAudio = [
    {audio: function(){
        $('#dealer-text p').text(`You're an angry little fishie'`)
        $('#player-text p').text(`AAARRGGHHHH!!!`)
        var gambit = new Audio()
        var joker = new Audio()
        gambit.src = `./assets/audio/Gambit/gambit-lose.wav`
        joker.src = `./assets/audio/Joker/joker-win.wav`
        gambit.play()
        $('#player-text').show()
        gambit.onended = function(){
            joker.play()
            $('#dealer-text').show()
        }
    }},
    {audio: function(){
        $('#dealer-text p').text(`You're fun when you're angry.`)
        $('#player-text p').text(`AAARRGGHHHH!!!`)
        var gambit = new Audio()
        var joker = new Audio()
        gambit.src = `./assets/audio/Gambit/gambit-lose.wav`
        joker.src = `./assets/audio/Joker/joker-win2.wav`
        gambit.play()
        $('#player-text').show()
        gambit.onended = function(){
            joker.play()
            $('#dealer-text').show()
        }
    }}
]

var jokerEntry = [
    {audio: function(){
        $('#dealer-text p').text(`Here fishie' fishie'...`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-entry.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`This next part is SO funny..`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-entry2.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`How nice, you saved me a spot`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-entry3.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`Let's hear what you got...`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-entry4.wav'
        joker.play()
        $('#dealer-text').show()
    }},
    {audio: function(){
        $('#dealer-text p').text(`Gonna love pulling the legs off you...`)
        var joker = new Audio()
        joker.src = './assets/audio/Joker/joker-entry5.wav'
        joker.play()
        $('#dealer-text').show()
    }}
]

var randomEntryAudio = function(){
    var x = Math.floor(Math.random() * 2)
    if(x === 1){
        randomAudio(jokerEntry)
    } else{
        $('#player-text p').text(`Ittt's showtime!`)
        var gambit = new Audio()
        gambit.src = './assets/audio/Gambit/gambit-enter.wav'
        gambit.play()
        $('#player-text').show()
        gambit.onended = function(){
            randomAudio(jokerEntry)
        }
    }
}


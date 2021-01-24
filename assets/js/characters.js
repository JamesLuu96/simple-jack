$('#characters').on('change', function(){
    $('.special').attr('src', `./assets/images/special/${$(this).val()}.png`)
    $('#player-img img').attr('src', `./assets/images/user-icon/${$(this).val()}.png`)
    $('#player-img p').text($('#characters option:selected').text())
})
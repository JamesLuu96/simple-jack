$('#player-health-bar-full').css('width', function() {
  return status = `${(playerHealth/playerMaxHealth) * 100}%`
})

$('#enemy-health-bar-full').css('width', function() {
  return status = `${(enemyHealth/enemyMaxHealth) * 100}%`
})
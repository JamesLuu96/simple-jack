
$('#inventory').removeClass('is-active')
var imageArr = []
var loadfromLoalstorage = function () {
    var imageArr = JSON.parse(localStorage.getItem("marvel")) || []
    return imageArr
}

var saveLocalStorage = function () {
    localStorage.setItem("marvel", JSON.stringify(imageArr))

}
$(document).on('click', '#btn-unlock', function () {

    var img = $(this).closest($('.img-con'))
    var marvelImg = img.children()[0]
    var title = img.children()[1]
    var titlepart = $(title).text()
    var imgsrc = $(marvelImg).attr('src')
    var obj = {
        title: titlepart,
        image: imgsrc
    }
    imageArr.push(obj)
    console.log(imageArr)
})

$('#my-list').on('click', function () {
    $('#inventory').addClass('is-active')
    var data = loadfromLoalstorage();
    for (var i = 0; i < data.length; i++) {
        // var listdiv = $('<div>').addClass("list-div")
        var listImg = $('<img>').addClass("list-image").attr("src", data[i].image)
        var title = $('<h4>').addClass("title").text(data[i].title)

        // $(listdiv).append(listImg, title)
        $('.my-list').append(listImg)
    }
})

// alert(image.getAttribute(src));
$('#close-inventory').on('click', function () {
    $('#inventory').removeClass('is-active')
})



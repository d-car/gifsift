const modal = $('#gifModal');
const modalContent= $('.modalContent');
const gifImg = $('<img>')

$(document).ready(function() {
    $(".fade").hide(0).delay(500).fadeIn(2000)
    modal.hide();

});

$('#searchBtn').on('click', function () {
    event.preventDefault();
    $('.gifDisplay').empty();
    userSearchQuery = $('#searchInput').val().trim();
    let result = userSearchQuery.replace(/ /g, '+');
    console.log('You Searched: ' + result)
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + result + '&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=72';
    
    // Store recent searches in localStorage

    localStorage.setItem('recentSearch', result)

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
      .then(function(response){
        let results = response.data;

        // console.log('results', results)

        $.each(results, function(index, value) {         

        
            // create elements for each gif/button and apply attributes

            gifCard = $('<div />')
            gifCard.addClass('gifCard')


            let imgSrc = value.images.fixed_height_still.url;
            let gifImg = $('<img>');
            gifImg.attr('src', imgSrc);
            gifImg.addClass('gifImg');
            gifImg.attr('data-still', value.images.fixed_height_still.url);
            gifImg.attr('data-animate', value.images.fixed_height.url);
            gifImg.attr('data-state', 'still');
            const gifURL = $('<button>')
            gifURL.addClass('button');


            $('.gifCard').append(gifImg)
            $('.gifCard').append(gifURL)
            $('.gifDisplay').append(gifCard);
        })    
      })
});

// pause/play gifs on click

$(document).on('click', '.gifImg', function() {
    const state = $(this).attr('data-state');
  
    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
        
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    
});
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
        const results = response.data;

        // console.log('results', results)

        $.each(results, function(index, value) {
                    
            // create elements for each gif/button and apply attributes

            const gifCard = $('<div />');
            gifCard.addClass('gifCard');
            // gifCard.attr('id', value.id)
            gifCard.attr('data-id', value.id)
            $('.gifDisplay').append(gifCard);


            const gifImg = $('<img>');
            const imgSrc = value.images.fixed_height_still.url  
            const gifBtn = $('<button>');

            // gif attributes

            gifImg.attr('data-id', value.id);
            gifImg.attr('src', imgSrc);
            gifImg.addClass('gifImg');
            gifImg.attr('data-still', value.images.fixed_height_still.url);
            gifImg.attr('data-animate', value.images.fixed_height.url);
            gifImg.attr('data-state', 'still');

            // button attributes

            gifBtn.attr('data-id', value.id);
            gifBtn.addClass('button gifBtn');
            gifBtn.text('getGif!')

            // console.log('id of gif: ' + value.id + ' id of btn: ' + gifBtn.data('id'))




            if (gifCard.data('data-id')==gifImg.data('data-id') && gifCard.data('data-id')==gifBtn.data('data-id')) {
                $(gifCard).append(gifImg)
                $(gifCard).append(gifBtn)
            }
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

$('button.gifBtn').on('click', function () {
    console.log('you clicked it');
    // if ($('#gifModal').css('display')=='none') {
        $('#gifModal').attr('style', 'display', 'block')
  
    // }
});
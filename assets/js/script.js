const gifArray = [];
const modal = $('#gifModal');
const modalContent= $('.modalContent');
const gifImg = $('<img>')

$(document).ready(function() {
    $(".fade").hide(0).delay(500).fadeIn(2000)
    modal.hide();

});


$('#searchBtn').on('click', function () {
    event.preventDefault();
    // let gifArray = [];
    $('.gifDisplay').empty();
    userSearchQuery = $('#searchInput').val().trim();
    let result = userSearchQuery.replace(/ /g, '+');
    console.log('You Searched: ' + result)
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + result + '&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=72';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
      .then(function(response){
        let results = response.data;
        gifArray.push(results);

        // for (i=0; i < gifArray; i++) {
        //     $("div class='gifResults' />").img(gifArray[i].images.fixed_height_still.url).appendTo('.gifDisplay')
        // }

        for (let i = 0; i < results.length; i++) {
            gifArray.push(results)
            const gifContainer = $('<div>')
            const gifImg = $('<img>')
            const gifButton = $('<button>')

            //assigning attributes to both the still and animated versions of the gif for click event later              
            gifImg.attr('src', results[i].images.fixed_height_still.url);
            gifImg.attr('data-still', results[i].images.fixed_height_still.url);
            gifImg.attr('data-animate', results[i].images.fixed_height.url);
            gifImg.attr('data-state', 'still');
            gifImg.attr('id', results[i].id)
            gifImg.addClass('gifImg');

            gifButton.attr('class', 'gifButton')
            gifButton.attr('name', 'Get GIF!')

            gifContainer.attr('class', 'gifContainer');

            //appends to gif div  
            $('.gifDisplay').append(gifImg);
            $('.gifDisplay').append(gifButton);
            $('.gifDisplay').append(gifContainer);
            $('.gifContainer').append(gifImg);

            

        }

        // gifArray.push(results);
        console.log('heres your array', gifArray)
    })
});

//pause/play gifs on click
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

// $(document).on('click', '.gifImg', function(id) {
//     modal.show();
//     console.log(this.indexOf(id))
// });

// window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }

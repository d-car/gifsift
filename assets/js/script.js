$('#searchBtn').on('click', function () {
    event.preventDefault();
    $('.gifDisplay').empty();
    userSearchQuery = $('#searchInput').val().trim();
    let result = userSearchQuery.replace(/ /g, '+');
    console.log('You Searched: ' + result)
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + result + '&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=24';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
      .then(function(response){
        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            const imgContainer = $("<div class='container imgContainer'>");
            const gifImg = $('<img>')
            //assigning attributes to both the still and animated versions of the gif for click event later              
            gifImg.attr("src", results[i].images.fixed_height_still.url);
            gifImg.attr("data-still", results[i].images.fixed_height_still.url);
            gifImg.attr("data-animate", results[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");
            gifImg.addClass("gifImg");
            imgContainer.append(gifImg)

            //prepends to gif div  
            $(".gifDisplay").prepend(imgContainer);

        }
    })
});

//pause/play gifs on click
$(document).on("click", ".gifImg", function() {
    var state = $(this).attr("data-state");
  
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
    
  });

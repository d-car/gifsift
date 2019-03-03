var queryArray = [];
// missing querys so those can be added by search field = Detroit Lions, Chicago Bears, Minnesota Vikings, Green Bay Packers
var queryImg = $("#queryImg")

//=================================================================================================================================

//function empties the button div
function renderButtons() {
    $("button-area").empty();
//then loops through queryArray and creates a button for each index, adds class/attributes
    for (var i = 0; i < queryArray.length; i++) {
        let button = document.getElementById("button");
            button.addClass("btn btn-primary");
            button.attr("data-name", queryArray[i]);
            button.text(queryArray[i]);
        $("#button-area").append(button);
    }
//click event that empties the gif div and assigns queryURL for ajax call
    $("searchButton").on("click", function() {
      event.preventDefault();
      $("#gif-area").empty();
        var userQuery = $(this).attr("data-name");
        console.log(userQuery);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + "+&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=12";
//ajax call to giphy API  
        $.ajax({
          url: queryURL,
          method: "GET"
    })
//promise that runs the response function and grabs the data from the API    
          .then(function(response) {
            var results = response.data;
//looping through the results (response.data array, 10 indeces as specified in queryURL) and creating a div for each gif  
            for (const i = 0; i < results.length; i++) {
              const gifDiv = $("<div>");
              const queryImg = $("<img>");
//assigning attributes to both the still and animated versions of the gif for click event later              
              queryImg.attr("src", results[i].images.fixed_height_still.url);
              queryImg.attr("data-still", results[i].images.fixed_height_still.url);
              queryImg.attr("data-animate", results[i].images.fixed_height.url);
              queryImg.attr("data-state", "still");
              queryImg.addClass("image");
              gifDiv.append(queryImg);
//prepends to gif div  
              $("#gif-area").prepend(gifDiv);
            }
          });
    })    
}

// Adds new button from whatever is entered in search field
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  
  const newQuery = $("#search-input").val().trim();
  queryArray.push(newQuery);
  console.log("Searched: " + newQuery);
  $("#button-area").empty();

  renderButtons();
});

//trying to pause/play gifs on click
$(document).on("click", ".image", function() {
  const state = $(this).attr("data-state");

  if (state === "still") {
  $(this).attr("src", $(this).data("animate"));
  $(this).attr("data-state", "animate");
  } else {
  $(this).attr("src", $(this).data("still"));
  $(this).attr("data-state", "still");
  }
  
});

  
//render buttons on page load  
renderButtons();
console.log(queryImg)










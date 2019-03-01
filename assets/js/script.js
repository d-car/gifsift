var teamArray = ["Denver Broncos", "Kansas City Chiefs", "Los Angeles Chargers", "Oakland Raiders", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Tennessee Titans", "Baltimore Ravens", "Cincinatti Bengals", "Cleveland Browns", "Pittsburgh Steelers", "Buffalo Bills", "Miami Dolphins", "New England Patriots", "New York Jets", "Dallas Cowboys", "New York Giants", "Philadelphia Eagles", "Washington Redskins", "Seattle Seahawks", "San Francisco 49ers", "Arizona Cardinals", "Los Angeles Rams", "Atlanta Falcons", "Carolina Panthers", "New Orleans Saints", "Tampa Bay Buccaneers",];
// missing teams so those can be added by search field = Detroit Lions, Chicago Bears, Minnesota Vikings, Green Bay Packers
var teamImg = $("#teamImg")

//=================================================================================================================================

//function empties the button div
function renderButtons() {
    document.getElementById("button-area").empty();
//then loops through teamArray and creates a button for each index, adds class/attributes
    for (var i = 0; i < teamArray.length; i++) {
        var button = document.getElementById("button");
            button.addClass("btn btn-primary");
            button.attr("data-name", teamArray[i]);
            button.text(teamArray[i]);
        $("#button-area").append(button);
    }
//click event that empties the gif div and assigns queryURL for ajax call
    $(".btn").on("click", function() {
      $("#gif-area").empty();
        var team = $(this).attr("data-name");
        console.log(team);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=nfl+" + team + "+football&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=12";
//ajax call to giphy API  
        $.ajax({
          url: queryURL,
          method: "GET"
    })
//promise that runs the response function and grabs the data from the API    
          .then(function(response) {
            var results = response.data;
//looping through the results (response.data array, 10 indeces as specified in queryURL) and creating a div for each gif  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
              var teamImg = $("<img>");
//assigning attributes to both the still and animated versions of the gif for click event later              
              teamImg.attr("src", results[i].images.fixed_height_still.url);
              teamImg.attr("data-still", results[i].images.fixed_height_still.url);
              teamImg.attr("data-animate", results[i].images.fixed_height.url);
              teamImg.attr("data-state", "still");
              teamImg.addClass("image");
              gifDiv.append(teamImg);
//prepends to gif div  
              $("#gif-area").prepend(gifDiv);
            }
          });
    })    
}

// Adds new button from whatever is entered in search field
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  
  var newTeam = $("#search-input").val().trim();
  teamArray.push(newTeam);
  console.log("Searched: " + newTeam);
  $("#button-area").empty();

  renderButtons();
});

//trying to pause/play gifs on click
$(document).on("click", ".image", function() {
  var state = $(this).attr("data-state");

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
console.log(teamImg)










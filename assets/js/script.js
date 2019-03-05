$('#searchBtn').on('click', function () {
    event.preventDefault();
    userSearchQuery = $('#searchInput').val().trim();
    const result = userSearchQuery.replace(/ /g, '+');
    console.log('You Searched: ' + result)
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + result + '&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=16';
    console.log(queryURL)
})

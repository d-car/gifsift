const modal = $('.modal');
const modalContent = $('.modalContent');
var results;
const mobileScreen = window.matchMedia("(max-width: 768px)")

$(document).ready(function () {
    $(".fade").hide(0).delay(500).fadeIn(2000)
    modal.hide();
});

// gif search

$('#searchBtn').on('click', function () {
    event.preventDefault();

    // page state changes

    $('.gifDisplay').empty();
    $('.gifDisplay').css('display', 'flex');
    $('#instructions').text('Click GIFs to play!');

    // ajax on giphy api

    userSearchQuery = $('#searchInput').val().trim();
    let result = userSearchQuery.replace(/ /g, '+');
    console.log('You Searched: ' + result);
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + result + '&api_key=YtWIFNouKBztP0svyc6zF5A0mJFrGUSl&limit=70';

    // Store recent searches in localStorage

    localStorage.setItem('recentSearch', result)

    $.ajax({
        url: queryURL,
        // dataType: 'jsonP',
        method: 'GET',
    })
        .then(function (response) {
            results = response.data;

            console.log('results', results)

            $.each(results, function (index, value) {

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
                gifBtn.text('getGif!');

                // append gif and button to card of same id

                if (gifCard.data('data-id') == gifImg.data('data-id') && gifCard.data('data-id') == gifBtn.data('data-id')) {
                    $(gifCard).append(gifImg)
                    $(gifCard).append(gifBtn)
                }
            })
        })


});

// pause/play gifs on click

$(document).on('click', '.gifImg', function () {
    const state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');

    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});

// open modal

$(document).on('click', '.gifBtn', function () {
    $('.modal-content').empty();
    console.log('you clicked it')

    // modal image attributes

    const modalImg = $('<img>');
    modalImg.addClass('modalImg');
    const modalTextArea = $('<textarea>');
    modalTextArea.addClass('modalLink');
    modalTextArea.attr('readonly', 'readonly')
    modalTextArea.attr('rows', 1);
    modalTextArea.attr('cols', 100);

    // mobile view

    if (mobileScreen.matches) {
        modalTextArea.attr('rows', 2);
        modalTextArea.attr('cols', 50);
    }

    // console.dir(this);

    let buttonId = this.dataset.id;

    $.each(results, function (index, value) {

        if (buttonId == value.id) {

            // mobile view

            if (mobileScreen.matches) {
                modalURL = value.images.fixed_width.url
            } else {
                modalURL = value.images.original.url
            }

            modalImg.attr('src', modalURL);
            $('.modal-content').append(modalImg);
            modalTextArea.append(modalURL);
            $('.modal-content').append(modalTextArea);

            // console.log('button and an index match');
            console.log(modalURL);
        }

        modal.show();

    });
});

// close modal

$(document).on('click', '.close', function () {

    modal.hide();

});
  
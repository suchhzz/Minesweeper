$(document).ready(function () {

    $('td').click(function () {
        $('.button-interface').addClass('active');

        let cellX = $(this).attr('data-cellX');
        let cellY = $(this).attr('data-cellY');

        setHitPoint(cellY, cellX);
    });

    $('.play-again-button').click(function () {
        $('.info-field').removeClass('active');
        setupGame();
    });
});

$(document).on('contextmenu', 'table td', function (event) {
    event.preventDefault();

    if ($(this).hasClass('flag')) {
        $(this).removeClass('flag').addClass('flag-question');
    } else if ($(this).hasClass('flag-question')) {
        $(this).removeClass('flag-question');
        flagsCounter--;
    } else {
        $(this).addClass('flag');
        flagsCounter++;
    }

    updateInterface();
});

setupGame();
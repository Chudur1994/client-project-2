$(document).ready(function () {
    const menu = $('.menu');
    /* background and nav are selected using vanilla javascript
    query selector because JQuery doesn't have a getBoundingClientRect()
    method.*/
    const background = document.querySelector('.dropdownBackground');
    const nav = document.querySelector('.top');

    // when the mouse enters an li element
    function handleEnter() {
        // add the trigger-enter class to the selected li element
        $(this).addClass('trigger-enter');
        $(this).children(':first').addClass('changeColor');
        /* after a small delay make the content inside the selected li
        visibile for a smooth looking effect*/
        setTimeout(() => $(this).hasClass('trigger-enter') && $(this).addClass('trigger-enter-active'), 75);
        /* add the open class to the background element that translates
        to each li*/
        $(background).addClass('open');
        // content of the selected li
        const dropDown = this.querySelector('.dropdown');
        /* The Element.getBoundingClientRect() method returns the size
        of an element and its position relative to the viewport. */
        const dropDownCoords = dropDown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();
        /* prepare the coordinates for the background element to translate into*/
        const coords = {
            height: dropDownCoords.height,
            width: dropDownCoords.width,
            top: dropDownCoords.top - navCoords.top,
            left: dropDownCoords.left - navCoords.left
        };
        /*because the li elements are absolute, sometimes if the content is too big
        then it will go out of screen
        by check the offset of each selected li i can position it appropriately*/
        if ($(dropDown).offset().left < 0) {
            coords.left = dropDownCoords.left - navCoords.left - $(dropDown).offset().left + 70;
            $(this).children('div').offset({
                left: coords.left
            });
        }
        // set the width of the dropdown background
        background.style.setProperty('width', `${coords.width}px`);
        // set the height of the dropdown background
        background.style.setProperty('height', `${coords.height}px`);
        // make the background move to the coordinates of the selected li element
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
    }

    // when the mouse leaves the li element
    function handleLeave() {
        /* remove trigger-enter and trigger-enter-active classes when
        the mouse leaves the current li*/
        $(this).removeClass('trigger-enter trigger-enter-active');
        $(this).children(':first').removeClass('changeColor');
        // remove dropdown background class
        $(background).removeClass('open');
    }

    // add mouseenter and mouseleave events only if the li has content
    menu.children().filter('.hasContent').mouseenter(handleEnter);
    menu.children().filter('.hasContent').mouseleave(handleLeave);


    // sticky header using JQuery plugin
    $("header").sticky({
        topSpacing: 0
    });

    // hexagon images using JQuery plugin
    $('.honeycombs').honeycombs({
        combWidth: 150,
        margin: 10
    });

    const populateImages = function () {
        const img = $('<img/>', {
            'class': 'test',
            src: 'images/picture_0.jpg',
            alt: 'MyAlt'
        });
        img.appendTo($('.staff'));
    }

    for (let i = 0; i < 30; i++) {
        populateImages();
    }

    const changeImg = function () {
        const img = $('img.test');
        let time = 25;
        img.each((i) => {
            setTimeout(() => {
                setTimeout(() => {
                    $(img[i]).css({
                        'transform': 'scale(1)',
                        'transition': 'all .1s'
                    });
                }, 25);
                $(img[i]).attr('src', 'images/picture_1.jpg');
                $(img[i]).css({
                    'transform': 'scale(1.3)',
                    'transition': 'all .1s'
                });
            }, time += 25);
        });
    }
    changeImg();
});

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

        // make sure the dropdown menu for degrees doesn't go past the about us
        // left offset to ensure it doesn't go out of screen
        if ($(dropDown).hasClass('degrees')) {
            coords.left = document.querySelector('.menu').firstElementChild.getBoundingClientRect().left;
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

    // degrees functionality
    const degrees = $('.degrees-content-container');

    // degrees click handler
    const handleDegreeClick = function () {
        /*i should learn a more elegand way of assigning 'this'...*/
        // that == 'degrees-content'
        const that = $(this);

        // changes the size of the clicked degree container
        const changeSize = function (flex) {
            that.css({
                "flex": flex,
                "background-color": "rgba(0, 0, 0, .4)",
                "transition": "all .2s"
            });
            that.siblings().css({
                "flex": 1,
                "background-color": "rgba(0, 0, 0, .2)",
                "transition": "all .2s"
            });
        }

        // reveals information about the clicked degree
        const hideOld = function () {
            // move the degree name up by 3rems
            that.children(':first').css({
                "top": "2rem",
                "transition": "all .2s"
            });

            // hide the rest of the information in the degree container
            that.children().not(':first').each(function () {
                $(this).css({
                    "opacity": "0",
                    "transition": ".2s"
                });
            });
        }

        // shows information about the selected degree
        const showNew = function () {
            // create concentrations title
            const concentration = $('<h3>Concentrations</h3>');
            concentration.addClass('absoluteCentered');
            that.append(concentration);

            // create unordered list of concentrations
            const list = $("<ul></ul>");
            list.addClass('absoluteCentered');
            that.append(list);

            // list of concentrations
            const concentrationList = ['WEB APPLICATION DEVELOPMENT',
                                       'MOBILE APPLICATION DEVELOPMENT',
                                       'WEARABLE AND UBIQUITOUS COMPUTING',
                                       'DATABASE',
                                       'PROJECT LIFE CYCLE'];

            // iterate over list, create list items (li) and added it to the ul
            $.each(concentrationList, (i, value) => {
                list.append(`<li>${value}</li>`);
            });

            // when another degree is click, move the degree name back down by 3rem
            // and show the information again
            that.siblings().each(function () {
                $(this).children(':first').css({
                    "top": "5rem",
                    "transition": "all .2s"
                });
                $(this).children().not(':first').each(function () {
                    $(this).css({
                        "opacity": "1",
                        "transition": ".2s"
                    });
                });
                $(this).children("ul, h3").each(function () {
                    $(this).css({
                        "opacity": "0",
                        "transition": ".2s"
                    });
                });
            });
        }

        if ($(this).parent().parent().hasClass("degrees-undergrad")) {
            changeSize("1.4");
            hideOld();
            showNew();
        } else if ($(this).parent().parent().hasClass("degrees-grad")) {
            changeSize("1.4");
            hideOld();
            showNew();
        }
    }

    // add handler to degrees on click
    degrees.children().click(handleDegreeClick);


    // const populateImages = function() {
    //   const img = $('<img/>', {
    //     'class': 'test',
    //     src: 'images/picture_0.jpg',
    //     alt: 'MyAlt'
    //   });
    //   img.appendTo($('.staff'));
    // }
    //
    // for (let i = 0; i < 25; i++) {
    //   populateImages();
    // }
    //
    // const changeImg = function() {
    //   const img = $('img.test');
    //   let time = 25;
    //   img.each((i) => {
    //     setTimeout(() => {
    //       setTimeout(() => {
    //         $(img[i]).css({
    //           'transform': 'scale(1)',
    //           'transition': 'all .1s'
    //         });
    //       }, 25);
    //       $(img[i]).attr('src', 'images/picture_1.jpg');
    //       $(img[i]).css({
    //         'transform': 'scale(1.3)',
    //         'transition': 'all .1s'
    //       });
    //     }, time += 25);
    //   });
    // }
    // changeImg();
});

// particles.js
particlesJS.load('particles-js', 'particles.json', () => {
    console.log('callback - particles.js config loaded');
});

$(document).ready(function() {
  // get data from the api and store in local storage for later use
  getData();

  // creates the about section
  createAbout();

  // creates the degrees section
  createDegrees("undergraduate");
  createDegrees('graduate');

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

  // create h3 element to user later in degrees container
  const concentration = $('<h3>Concentrations</h3>');
  const concentrationArr = [
    ['WEB APPLICATION DEVELOPMENT', 'MOBILE APPLICATION DEVELOPMENT', 'WEARABLE AND UBIQUITOUS COMPUTING', 'DATABASE', 'PROJECT LIFE CYCLE'],
    ['WEB APPLICATION DEVELOPMENT', 'MOBILE APPLICATION DEVELOPMENT', 'WEARABLE AND UBIQUITOUS COMPUTING', 'DATABASE', 'PROJECT LIFE CYCLE']
  ];

  console.log(concentrationArr);
  // degrees functionality
  const degrees = $('.degrees-content-container');

  // degrees click handler
  const handleDegreeClick = function() {
    /*i should learn a more elegand way of assigning 'this'...*/
    // that == 'degrees-content'
    const that = $(this);

    // changes the size of the clicked degree container
    const changeSize = function(flex) {
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

    // hide old information about the clicked degree
    const hideOld = function() {
      // move the degree name up by 3rems
      that.children(':first').css({
        "top": "2rem",
        "transition": "all .2s"
      });

      // hide the rest of the information in the degree container
      that.children().not(':first').each(function() {
        $(this).css({
          "opacity": "0",
          "transition": ".2s"
        });
      });
    }

    // shows new information about the selected degree
    const showNew = function() {
      // when another degree is click, move the degree name back down by 3rem
      // and show the information again
      that.siblings().each(function() {
        $(this).children(':first').css({
          "top": "5rem",
          "transition": "all .2s"
        });
        $(this).children().not(':first').each(function() {
          $(this).css({
            "opacity": "1",
            "transition": ".2s"
          });
        });
        $(this).children("ul, h3").each(function() {
          $(this).css({
            "opacity": "0",
            "transition": ".2s"
          });
        });
      });
    }

    if ($(this).parent().parent().hasClass("degrees-undergraduate")) {
      changeSize("1.4");
      hideOld();
      showNew();
    } else if ($(this).parent().parent().hasClass("degrees-graduate")) {
      changeSize("1.4");
      hideOld();
      showNew();
    }
  }

  const degreeHandleClick = function(event) {
    event.preventDefault();
    const that = $(this);

    $(this).find('p, ul, span').fadeToggle();

    const title = $(this).find('h2');

    const moveTitle = function() {
      if (title.hasClass('isDown')) {
        title.stop().animate({
          top: "2rem"
        });
      } else {
        title.stop().animate({
          top: "5rem"
        });
      };
      title.toggleClass("isDown");
    }

    moveTitle();



    // $("#arrow_container").click(function(event) {
    //   event.preventDefault();
    //   if ($(this).hasClass("isDown")) {
    //     $("#nav").stop().animate({
    //       marginTop: "-100px"
    //     }, 200);
    //   } else {
    //     $("#nav").stop().animate({
    //       marginTop: "0px"
    //     }, 200);
    //   }
    //   $(this).toggleClass("isDown");
    //   return false;
    // });


    // changes the size of the clicked degree container
    const changeSize = function(flex) {
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

    if ($(this).parent().parent().hasClass("degrees-undergraduate")) {
      changeSize("1.4");
    } else if ($(this).parent().parent().hasClass("degrees-graduate")) {
      changeSize("1.4");
    }
  }

  // add handler to degrees on click
  degrees.children().click(degreeHandleClick);

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


// gets all the 'about' data from the local storage and adds it to the html
const createAbout = function() {
  const about = JSON.parse(localStorage.getItem('about'));
  const title = $(`<h2>${about.title}</h2>`);
  title.addClass('intro-title');
  $('.intro-title-container').append(title);

  const description = $(`<p>${about.description}</p>`);
  description.addClass('intro-text');
  $('.intro').append(description);

  const quote = $(`<blockquote>${about.quote}</blockquote>`);
  quote.addClass('quote');
  $('.intro').append(quote);

  const quoteAuthor = $(`<span>${about.quoteAuthor}</span>`);
  quoteAuthor.addClass('quote-person');
  $('.intro').append(quoteAuthor);
} // end createAbout

// gets all the 'about' data from the local storage and adds it to the html
const createDegrees = function(degreeType) {
  const degrees = JSON.parse(localStorage.getItem('degrees'));
  $.each(degrees[degreeType], (i, value) => {
    if (value.degreeName === "graduate advanced certificates") {
      console.log('advanced certificates');
    } else {
      // degrees-content div
      const div = $('<div></div>');
      div.addClass('degrees-content');

      // 'Concentrations' h3 sub-title
      const concentration = $('<h3>Concentrations</h3>');
      concentration.addClass('degrees-will-show');
      $(div).append(concentration);

      // title
      const title = $(`<h2>${value.title}</h2>`);
      title.addClass('isDown');
      $(div).append(title);

      // description
      const description = $(`<p>${value.description}</p>`);
      $(div).append(description);

      // find out more
      const learnMore = $('<span>Click to find out more.</span>');
      $(div).append(learnMore);

      // concentrations unordered list
      const concentrations = $("<ul></ul>");
      concentrations.addClass('degrees-will-show');

      // get concentrations array from api
      const concentrationList = value.concentrations;

      // add each array item to the concentration unordered list
      $.each(concentrationList, (i, value) => {
        concentrations.append(`<li>${value}</li>`);
      });
      $(div).append(concentrations);

      //will add the div to either '.degrees-undergraduate' or '.degrees-graduate'
      $(`.degrees-${degreeType} > .degrees-content-container`).append(div);
    }
  }); // end each
} // end createDegrees

// particles.js
particlesJS.load('particles-js', 'assets/particles.json', () => {
  console.log('callback - particles.js config loaded');
});

$(document).ready(function() {
  // get data from the api and store in local storage for later use
  getData();

  // creates the about section
  createAbout();

  // creates the degrees section
  createDegrees("undergraduate");
  createDegrees('graduate');

  // ---------------------------- degrees functionality ----------------------------
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


  // ---------------------------- degrees functionality ----------------------------
  const degrees = $('.degrees-content-container');

  const degreesClickHandler = function() {
    if ($(this).parent().parent().hasClass("degrees-undergraduate")) {
      $(this).siblings().removeClass('degrees-content-active');
      $(this).addClass('degrees-content-active');

      $(this).children("h3, ul").addClass("degrees-content-open");
      $(this).siblings().children("h3, ul").removeClass("degrees-content-open");

      $(this).children("p, span").addClass("degrees-content-description-span-inactive");
      $(this).siblings().children("p, span").removeClass("degrees-content-description-span-inactive")
    } else if ($(this).parent().parent().hasClass("degrees-graduate")) {
      $(this).siblings().removeClass('degrees-content-active');
      $(this).addClass('degrees-content-active');

      $(this).children("h3, ul").addClass("degrees-content-open");
      $(this).siblings().children("h3, ul").removeClass("degrees-content-open");

      $(this).children("p, span").addClass("degrees-content-description-span-inactive");
      $(this).siblings().children("p, span").removeClass("degrees-content-description-span-inactive")
    }
  }

  // add handler to degrees on click
  degrees.children().click(degreesClickHandler);

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

  const quoteAuthor = $(`<span>- ${about.quoteAuthor} -</span>`);
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

      // title
      const title = $(`<h2>${value.title}</h2>`);
      $(div).append(title);

      // 'Concentrations' h3 sub-title
      const concentration = $('<h3>Concentrations</h3>');
      $(div).append(concentration);

      // concentrations unordered list
      const concentrations = $("<ul></ul>");

      // get concentrations array from api
      const concentrationList = value.concentrations;

      // add each array item to the concentration unordered list
      $.each(concentrationList, (i, value) => {
        concentrations.append(`<li>${value}</li>`);
      });
      $(div).append(concentrations);

      // description
      const description = $(`<p>${value.description}</p>`);
      $(div).append(description);

      // find out more
      const learnMore = $('<span>Click to find out more.</span>');
      $(div).append(learnMore);


      //will add the div to either '.degrees-undergraduate' or '.degrees-graduate'
      $(`.degrees-${degreeType} > .degrees-content-container`).append(div);
    }
  }); // end each
} // end createDegrees

// particles.js
particlesJS.load('particles-js', 'assets/particles.json', () => {
  console.log('callback - particles.js config loaded');
});

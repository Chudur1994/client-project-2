//api:  http://www.ist.rit.edu/api/
var x = '';

// gets about information
var getAbout = function () {
    myXHR('get', {
        'path': '/about/'
    }).done((json) => {
        console.log(json)
    }); //end myXHR
}

//myXHR('get', {
//    'path': '/degrees/undergraduate/'
//}).done((json) => {
//    var x = '';
//    //loop through undergraduate array
//    $.each(json.undergraduate, (i, item) => {
//        x += `<h2>${item.title}(${item.degreeName.toUpperCase()})</h2>
//                          <p>${item.description}</p>
//                          <h3>Concentrations</h3>
//                          <ul>`;
//        //loop through concentrations array
//        $.each(item.concentrations, (i, item) => {
//            x += `<li>${item}</li>`;
//        });
//        x += `</ul>`;
//        $('#content').html(x);
//    });
//}); //end myXHR
//
////show the faculty information
//myXHR('get', {
//    'path': '/people/faculty/'
//}).done((json) => {
//    var x = '';
//    $.each(json.faculty, (i, item) => {
//        x += `<div onclick='facMore(this)' data-id='${item.username}' style='cursor:pointer;'>
//                          <h2>${item.name}</h2>
//                          <p>${item.title}</p>
//                          <img src='${item.imagePath}'/>
//                          <hr/>
//                          </div>`;
//    }); //end each
//    $('#people').html(x);
//}); //end myXHR
//
////add the facMore function outside of the document.ready
//function facMore(who) {
//    //get the information out of the data-id attribute
//    var id = $(who).attr('data-id');
//
//    myXHR('get', {
//        'path': `/people/faculty/username=${id}`
//    }).done((json) => {
//        console.log(`facMore = ${json.interestArea}`);
//    });
//} //end facMore

/* 
    AJAX function to get information for us
    AJAX utility 
    t = get or post 
    d = path : /about/ 
*/
function myXHR(t, d) {
    return $.ajax({
        type: t,
        //information will be changing often
        cache: false,
        async: true,
        dataType: 'json',
        url: 'proxy/proxy.php',
        data: d,
        //happens before sending information
        beforeSend: function () {}
    }).always(function () {
        //happens at end, no matter what
    }).fail(function () {
        //handles failures
        console.log(`Failure with ${d.path}`);
    });
    //end my XHR
}

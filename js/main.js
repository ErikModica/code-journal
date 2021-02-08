/* global data */
/* exported data */

var $imgURL = document.querySelector('input');
var $image = document.querySelector('.entry-image');
$imgURL.addEventListener('input', function (event) {

  $image.setAttribute('src', event.target.value);
});

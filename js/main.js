/* global data */
/* exported data */

var $imgURL = document.querySelector('.img-url-input');
var $image = document.querySelector('.entry-image');
var $entryForm = document.querySelector('.entry-form');
var entryFormInfo = {};

$imgURL.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  entryFormInfo[$entryForm.elements.imageUrl.name] = $entryForm.elements.imageUrl.value;
  entryFormInfo[$entryForm.elements.title.name] = $entryForm.elements.title.value;
  entryFormInfo[$entryForm.elements.notes.name] = $entryForm.elements.notes.value;
  entryFormInfo.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;

  data.entries.unshift(entryFormInfo);

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.elements.imageUrl.value = null;
  $entryForm.elements.title.value = null;
  $entryForm.elements.notes.value = null;
});

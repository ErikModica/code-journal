/* global data */
/* exported data */

var $imgURL = document.querySelector('.img-url-input');
var $image = document.querySelector('.entry-image');
var $entryForm = document.querySelector('.entry-form');

$imgURL.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var entryFormInfo = {};

  entryFormInfo[$entryForm.elements.title.name] = $entryForm.elements.title.value;
  entryFormInfo[$entryForm.elements.imageUrl.name] = $entryForm.elements.imageUrl.value;
  entryFormInfo[$entryForm.elements.notes.name] = $entryForm.elements.notes.value;
  entryFormInfo.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;

  data.entries.push(entryFormInfo);

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entry.prepend(renderEntry(entryFormInfo));

  $entryForm.elements.title.value = null;
  $entryForm.elements.imageUrl.value = null;
  $entryForm.elements.notes.value = null;

  $entryFormEntireDiv.className = 'entry-form-entire-div inactive';
  $entriesEntireDiv.className = 'entries-entire-div active';
});

var $entry = document.querySelector('.entry-list');

function renderEntry(object) {

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');

  var $bodyRow = document.createElement('div');
  $bodyRow.setAttribute('class', 'row');
  $container.appendChild($bodyRow);

  var $columnHalfImg = document.createElement('div');
  $columnHalfImg.setAttribute('class', 'column-half');
  $bodyRow.appendChild($columnHalfImg);

  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('class', 'entry-image');
  $entryImg.setAttribute('src', object.imageUrl);
  $columnHalfImg.appendChild($entryImg);

  var $columnHalfText = document.createElement('div');
  $columnHalfText.setAttribute('class', 'column-half');
  $bodyRow.appendChild($columnHalfText);

  var $titleH2 = document.createElement('h2');
  $titleH2.textContent = object.title;
  $columnHalfText.appendChild($titleH2);

  var $notesPar = document.createElement('p');
  $notesPar.textContent = object.notes;
  $columnHalfText.appendChild($notesPar);

  return $container;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entry.prepend(renderEntry(data.entries[i]));
  }
});

var $entryFormEntireDiv = document.querySelector('.entry-form-entire-div');
var $newEntryAnchor = document.querySelector('.new-entry-anchor');
var $entriesNavAnchor = document.querySelector('.entries-nav-anchor');
var $entriesEntireDiv = document.querySelector('.entries-entire-div');

$newEntryAnchor.addEventListener('click', function (event) {
  $entryFormEntireDiv.className = 'entry-form-entire-div active';

  $entriesEntireDiv.className = 'entries-entire-div inactive';
});

$entriesNavAnchor.addEventListener('click', function (event) {
  $entryFormEntireDiv.className = 'entry-form-entire-div inactive';

  $entriesEntireDiv.className = 'entries-entire-div active';
});

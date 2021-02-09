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

  $entryForm.elements.title.value = null;
  $entryForm.elements.imageUrl.value = null;
  $entryForm.elements.notes.value = null;
});

// window.addEventListener('beforeunload', function (event) {

//   var entryDataJSON = JSON.stringify(data);

//   localStorage.setItem('entryData', entryDataJSON);

// });

var $entry = document.querySelector('ul');

function renderEntry(object) {

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');

  // var $titleRow = document.createElement('div');
  // $titleRow.setAttribute('class', 'row');
  // $container.appendChild($titleRow)

  // var $columnFull = document.createElement('div');
  // $columnFull.setAttribute('class', 'column-full');
  // $titleRow.appendChild($columnFull)

  // var $titleH1 = document.createElement('h1');
  // $titleH1.textContent = data.entries[i].title;
  // $columnFull.appendChild($titleH1);

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

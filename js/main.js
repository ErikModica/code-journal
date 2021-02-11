/* global data */
/* exported data */

var editTime = false;

var $imgURL = document.querySelector('.img-url-input');
var $image = document.querySelector('.entry-image');
var $entryForm = document.querySelector('.entry-form');

$imgURL.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var entryFormInfo = {};

  entryFormInfo.title = $entryForm.elements.title.value;
  entryFormInfo.imageUrl = $entryForm.elements.imageUrl.value;
  entryFormInfo.notes = $entryForm.elements.notes.value;

  if (editTime) {

    entryFormInfo.nextEntryId = data.editing.nextEntryId;
    entryFormInfo.title = $entryForm.elements.title.value;
    entryFormInfo.imageUrl = $entryForm.elements.imageUrl.value;
    entryFormInfo.notes = $entryForm.elements.notes.value;

    var $editedEntry = (document.querySelectorAll('.entry'));

    var matchingEntryIDNum;
    var nodeIndex = 0;

    while (data.editing.nextEntryId !== matchingEntryIDNum) {
      matchingEntryIDNum = parseInt($editedEntry[nodeIndex].getAttribute('data-entry-id'));
      nodeIndex++;
    }

    $editedEntry = (document.querySelectorAll('.entry'))[nodeIndex - 1];
    $editedEntry.replaceWith(renderEntry(entryFormInfo));
    data.entries.splice(nodeIndex - 1, 1, entryFormInfo);

    editTime = false;
    data.editing = null;

  } else {

    entryFormInfo.nextEntryId = data.nextEntryId;

    data.entries.unshift(entryFormInfo);

    $entry.prepend(renderEntry(entryFormInfo));
    data.nextEntryId += 1;
  }

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();

  $entryFormEntireDiv.className = 'entry-form-entire-div hidden';
  $entriesEntireDiv.className = 'entries-entire-div';

});

var $entry = document.querySelector('.entry-list');

function renderEntry(object) {

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container entry');
  $container.setAttribute('data-entry-id', object.nextEntryId);

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

  var $editEntryButton = document.createElement('i');
  $editEntryButton.setAttribute('class', 'fas fa-edit');
  $titleH2.appendChild($editEntryButton);

  var $notesPar = document.createElement('p');
  $notesPar.textContent = object.notes;
  $columnHalfText.appendChild($notesPar);

  return $container;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entry.appendChild(renderEntry(data.entries[i]));
    data.editing = null;
  }
});

var $entryFormEntireDiv = document.querySelector('.entry-form-entire-div');
var $newEntryAnchor = document.querySelector('.new-entry-anchor');
var $entriesNavAnchor = document.querySelector('.entries-nav-anchor');
var $entriesEntireDiv = document.querySelector('.entries-entire-div');

$newEntryAnchor.addEventListener('click', function (event) {
  document.querySelector('.new-entry').textContent = 'New Entry';
  $entryFormEntireDiv.className = 'entry-form-entire-div';

  $entriesEntireDiv.className = 'entries-entire-div hidden';
});

$entriesNavAnchor.addEventListener('click', function (event) {
  $entryFormEntireDiv.className = 'entry-form-entire-div hidden';

  $entriesEntireDiv.className = 'entries-entire-div';

  $entryForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  editTime = false;
});

$entry.addEventListener('click', function (event) {

  if (event.target.tagName === 'I') {
    var $closestEntry = event.target.closest('.container');

    document.querySelector('.new-entry').textContent = 'Edit Entry';
    editTime = true;

    $entryFormEntireDiv.className = 'entry-form-entire-div';
    $entriesEntireDiv.className = '.entries-entire-div hidden';

    var closestEntryIDNum = parseInt($closestEntry.getAttribute('data-entry-id'));

    var closestIndex = 0;
    while (closestEntryIDNum !== data.entries[closestIndex].nextEntryId) {
      closestIndex++;
    }

    data.editing = data.entries[closestIndex];

    $entryForm.elements.title.value = data.editing.title;
    $entryForm.elements.imageUrl.value = data.editing.imageUrl;
    $entryForm.elements.notes.value = data.editing.notes;

    $image.setAttribute('src', data.editing.imageUrl);

    var $deleteAnchor = document.createElement('a');
    $deleteAnchor.setAttribute('class', 'delete-anchor');
    $deleteAnchor.textContent = 'DELETE ENTRY';
    $entryForm.appendChild($deleteAnchor);

    var $deleteEntryPrompt = document.querySelector('.delete-prompt-container');

    $deleteAnchor.addEventListener('click', function (event) {
      $deleteEntryPrompt.className = 'delete-prompt-container';
    });

    var $cancelDeletionButton = document.querySelector('.cancel-anchor-prompt');
    $cancelDeletionButton.addEventListener('click', function (event) {
      $deleteEntryPrompt.className = 'delete-prompt-container hidden';
    });

  }
});

/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('entryData');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {

  var entryDataJSON = JSON.stringify(data);

  localStorage.setItem('entryData', entryDataJSON);

});

const ARTIST_INFO_FRAGMENT = "/assets/fragments/artistInfo.html";
const EVENT_THUMB_FRAGMENT = "/assets/fragments/eventThumb.html";

function getArtists() {
  $.get(`/artists`)
    .done(parseData)
    .catch(handleError);
}

function parseData(data) {
  if (!data.length) handleEmptyData("#artists-container");
  else
    data.forEach(artist => {
      $("#artists-container").loadTemplate($("#artistCardTemplate"), artist, {
        append: true
      });
    });
}

/* ARTIST DETAILS PAGE */
function getArtistData() {
  let artist_id = parseQueryString(location.search).id;
  if (!artist_id) location.replace("/pages/artists.html"); // If no artist is specified, fall back to the artists list
  $.get(`/artists/${artist_id}`)
    .done(parseArtistData)
    .catch(handleError);
}

function parseArtistData(data) {
  $(document).prop("title", data.name);
  $("#artist-info").loadTemplate($("#artistInfoTemplate"), data, {
    async: false
  });
  $("#artist-info-events").loadTemplate($("#eventThumbTemplate"), data.events, {
    append: true
  });
}

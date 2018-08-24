const ARTIST_CARD_FRAGMENT = "/assets/fragments/artistCard.html";
const ARTIST_INFO_FRAGMENT = "/assets/fragments/artistInfo.html";

$(document).ready(getArtists);
$.addTemplateFormatter("ArtistsHrefFormatter", formatArtistHref);
$.addTemplateFormatter("ArtistsEventCountFormatter", formatArtistsEventCount);
$.addTemplateFormatter("ArtistWebsiteFormatter", formatArtistWebsite);
function getArtists() {
  $.get(`/artists`)
    .done(parseData)
    .catch(handleError);
}

function parseData(data) {
  data.forEach(artist => {
    $("#artists-container").loadTemplate(ARTIST_CARD_FRAGMENT, artist, {
      append: true
    });
  });
}

function formatArtistHref(value, template) {
  return `/pages/artist.html?id=${value}`;
}

function formatArtistsEventCount(value, template) {
  return `${value} event${value == 1 ? "" : "s"}`;
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
  $("#artist-info").loadTemplate(ARTIST_INFO_FRAGMENT, data, {async: true});
}

function formatArtistWebsite(value, template) {
  return `http://${value}`; //Add http to url
}
function handleError(err) {
  //TODO: Show error message
}

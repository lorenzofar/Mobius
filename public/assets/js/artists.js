const ARTIST_CARD_FRAGMENT = "/assets/fragments/artistCard.html";

$(document).ready(getArtists);
$.addTemplateFormatter("ArtistsHrefFormatter", formatArtistHref);
$.addTemplateFormatter("ArtistsEventCountFormatter", formatArtistsEventCount);

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

function handleError(err) {
  //TODO: Show error message
}
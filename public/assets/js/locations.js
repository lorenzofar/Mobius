const LOCATION_CARD_FRAGMENT = "/assets/fragments/locationCard.html";

$(document).ready(() => {
  $.get("/locations")
    .done(parseLocations)
    .catch(handleError);
});

function parseLocations(data) {
  data.forEach(l =>
    $("#locations-container").loadTemplate(LOCATION_CARD_FRAGMENT, l, {
      append: true
    })
  );
}

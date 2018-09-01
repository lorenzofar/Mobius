$(document).ready(() => {
  $.get("/locations")
    .done(parseLocations)
    .catch(handleError);
});

function parseLocations(data) {
  data.forEach(l =>
    $("#locations-container").loadTemplate($("#locationCardTemplate"), l, {
      append: true
    })
  );
}

$(document).ready(() => {
  let event_id = parseQueryString(location.search).id;
  if (!event_id) location.replace("/pages/events.html"); // If no event is specified, fall back to the events list
  $.get(`/events/${event_id}`)
    .done(data => parseEventData(event_id, data))
    .catch(handleError);
});

function parseEventData(id, data) {
  // Check if the event is not a side event
  if (data.type == "side")
    location = location.toString().replace("main", "side");
  $(document).prop("title", data.name); // Set page title
  $("#event-info").loadTemplate($("#template"), data, { async: false });
  $(".fab").addClass(data.type);
  $("#tickets-btn").attr("href", `/pages/book.html?id=${id}`);
  populateArtistsThumbs(data.type, data.artists);
}

function populateArtistsThumbs(type, artists) {
  // Check if it is a side event
  if (type === "side") {
    $("#artists-header").hide();
    $("#event-info-artists").hide();
    $("#tickets-btn").hide();
    return;
  }

  artists.forEach(artist => {
    if (artist.f1)
      $("#event-info-artists").loadTemplate($("#artistThumbTemplate"), artist, {
        append: true
      });
  });
}

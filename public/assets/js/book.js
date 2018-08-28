var event_id;

$(document).ready(() => {
  let id = (event_id = parseQueryString(location.search).id);
  if (!id) location.replace("/pages/events.html"); // If no event is specified, fall back to the events list;
  $.get(`/events/${id}?fields=name,location,dt`)
    .done(parseData)
    .catch(handleError);
});

function parseData(data) {
  $("#eventNameInput").val(data.name);
  $("#eventDateInput").val(formatEventDate(data.dt));
  $("#eventLocationInput").val(data.location);
}

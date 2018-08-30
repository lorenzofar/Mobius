const EVENT_INFO_FRAGMENT = "/assets/fragments/sideEventInfo.html";

$(document).ready(() => {
  let event_id = parseQueryString(location.search).id;
  if (!event_id) location.replace("/pages/events.html"); // If no event is specified, fall back to the events list
  $.get(`/events/${event_id}`)
    .done(parseEventData)
    .catch(handleError);
});

function parseEventData(data) {
  // Check if the event is a side event
  if (data.type != "side")
    location = location.toString().replace("side", "main");
  $(document).prop("title", data.name); // Set page title
  $("#event-info").loadTemplate(EVENT_INFO_FRAGMENT, data, { async: false });
}

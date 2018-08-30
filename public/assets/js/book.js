var event_id;

$(document).ready(() => {
  const element = document.querySelector("form");
  element.addEventListener("submit", bookEvent);
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

function bookEvent(event) {
  event.preventDefault();
  let booking = {
    event: event_id,
    name: $("#nameInput").val(),
    surname: $("#surnameInput").val(),
    email: $("#emailInput").val()
  };
  $.post("/bookings", booking)
    .then(alert("Ticket booked succesfully"))
    .catch(handleError);
}
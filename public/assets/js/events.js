const EVENT_CARD_FRAGMENT = "/assets/fragments/eventCard.html";

var DATE_FILTER = "";
var TYPE_FILTER = "";

/* EVENTS PAGE */
function getEvents() {
  $.get(`/events?date=${DATE_FILTER}&type=${TYPE_FILTER}`)
    .done(parseEvents)
    .catch(handleError);
}

function getDates() {
  $.get("/dates").done(populateDatesOptions);
  populateTypesOptions(); // Load also event types
}

function parseEvents(data) {
  $("#events-container").html(""); // Clear previous items
  //TODO: Check if there are events to display, otherwise show an error message
  data.forEach(event => {
    $("#events-container").loadTemplate(EVENT_CARD_FRAGMENT, event, {
      append: true
    });
  });
}

function populateDatesOptions(data) {
  let dates = data.map(d => {
    let dt = new Date(d);
    return {
      id: dt.toISOString().split("T")[0],
      txt: formatDate(dt)
    };
  });
  dates.unshift({ id: "", txt: "All days" });
  let html = "";
  dates.forEach(d => (html += `<option id='${d.id}'>${d.txt}</option>`));
  $("#events-dates")[0].innerHTML = html;
}

function populateTypesOptions() {
  let html = "";
  EVENT_TYPES.forEach(d => (html += `<option id='${d.id}'>${d.txt}</option>`));
  $("#events-types")[0].innerHTML = html;
}

function handleDateChange(e) {
  let selector = $("#events-dates")[0];
  DATE_FILTER = selector.options[selector.selectedIndex].id;
  getEvents();
}

function handleTypeChange(e) {
  let selector = $("#events-types")[0];
  TYPE_FILTER = selector.options[selector.selectedIndex].id;
  getEvents();
}

function handleEventClick(e) {
  let type = e.className;
  let dest = type === "side" ? "side" : "main";
  location = `${dest}event.html?id=${e.id}`;
}
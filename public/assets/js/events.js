const EVENT_CARD_FRAGMENT = "/assets/fragments/eventCard.html";

var DATE_FILTER = "";
var TYPE_FILTER = "";

$.addTemplateFormatter("ArtistChipsFormatter", buildArtistChip);
$.addTemplateFormatter("EventsHrefFormatter", formatEventHref);

function getEvents() {
  $.get(`/events?date=${DATE_FILTER}&type=${TYPE_FILTER}`)
    .done(parseData)
    .catch(handleError);
}

var getDates = () => $.get("/dates").done(populateDatesOptions);

function parseData(data) {
  $("#events-container").html(""); // Clear previous items
  //TODO: Check if there are events to display, otherwise show an error message
  data.forEach(event => {
    $("#events-container").loadTemplate(EVENT_CARD_FRAGMENT, event, {
      append: true
    });
  });
}

function handleError(err) {
  //TODO: Show error message
}

function populateDatesOptions(data) {
  let dates = data.map(d => {
    let dt = new Date(d);
    return {
      id: dt.toISOString().split("T")[0],
      txt: dt
        .toDateString()
        .split(" ")
        .slice(1, 3)
        .reverse()
        .join(" ")
    };
  });
  dates.unshift({ id: "", txt: "All days" });
  let html = "";
  dates.forEach(d => (html += `<option id='${d.id}'>${d.txt}</option>`));
  $("#events-dates")[0].innerHTML = html;
}

function buildArtistChip(value, template) {
  let html = "";
  value.forEach(a => {
    if (a)
      html += `<div class="mdl-chip"><div class="mdl-chip__text">${a}</div></div>`;
  });
  return html;
}

function formatEventHref(value, template) {
  return `/pages/event.html?id=${value}`;
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
const EVENT_CARD_FRAGMENT = "/assets/fragments/eventCard.html";
const EVENT_INFO_FRAGMENT = "/assets/fragments/eventInfo.html";
const ARTIST_THUMB_FRAGMENT = "/assets/fragments/artistThumb.html";

const EVENT_TYPES = [
  { id: "", txt: "All types" },
  { id: "theatre", txt: "Theatre" },
  { id: "music", txt: "Music" },
  { id: "dance", txt: "Dance" },
  { id: "side", txt: "Side events" }
];

var DATE_FILTER = "";
var TYPE_FILTER = "";

$.addTemplateFormatter("ArtistChipsFormatter", buildArtistChip);
$.addTemplateFormatter("EventsHrefFormatter", formatEventHref);
$.addTemplateFormatter("ArtistsHrefFormatter", formatArtistHref);
$.addTemplateFormatter("EventDateFormatter", formatEventDate);

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

/* SINGLE EVENT PAGE */
function getEventData() {
  let event_id = parseQueryString(location.search).id;
  if (!event_id) location.replace("/pages/events.html"); // If no event is specified, fall back to the events list
  $.get(`/events/${event_id}`)
    .done(parseEventData)
    .catch(handleError);
}

function parseEventData(data) {
  $(document).prop("title", data.name); // Set page title
  $("#event-info").loadTemplate(EVENT_INFO_FRAGMENT, data, { async: false });
  $(".fab").addClass(data.type);
  populateArtistsThumbs(data.artists);
}

function populateArtistsThumbs(artists) {
  artists.forEach(artist => {
    $("#event-info-artists").loadTemplate(ARTIST_THUMB_FRAGMENT, artist, {
      append: true
    });
  });
}

function formatEventDate(value, template) {
  let d = new Date(value);
  return `${formatDate(d)} - ${d.getHours()}:${d.getMinutes()}`;
}

function formatArtistHref(value, template) {
  return `/pages/artist.html?id=${value}`;
}

/* GENERIC */

function handleError(err) {
  //TODO: Show error message
}

function formatDate(date) {
  let temp = date
    .toDateString()
    .split(" ")
    .slice(1, 4)
    .reverse();
  temp.push(temp.shift());
  return temp.join(" ");
}
const EVENT_CARD_FRAGMENT = "/assets/fragments/eventCard.html";

var DATE_FILTER = "";
var TYPE_FILTER = "";

$.addTemplateFormatter("ArtistChipsFormatter", buildArtistChip);
$.addTemplateFormatter("EventsHrefFormatter", formatEventHref);

$(document).ready(getEvents)

function getEvents() {
    $.get(`/events?date=${DATE_FILTER}&type=${TYPE_FILTER}`).done(parseData).catch(handleError);
}

function parseData(data) {
    data.forEach(event => {
        $("#events-container").loadTemplate(EVENT_CARD_FRAGMENT, event, {
            append: true
        });
    });
}

function handleError(err) {
    //TODO: Show error message
}

function buildArtistChip(value, template) {
    let html = "";
    value.forEach(a => {
        if (a) html += `<div class="mdl-chip"><div class="mdl-chip__text">${a}</div></div>`;
    });
    return html;
}

function formatEventHref(value, template){
    return `/pages/event.html?id=${value}`;
}
const EVENT_TYPES = [
  { id: "", txt: "All types" },
  { id: "theatre", txt: "Theatre" },
  { id: "music", txt: "Music" },
  { id: "dance", txt: "Dance" },
  { id: "side", txt: "Side events" }
];

function parseQueryString(search_string) {
  search_string = search_string.replace("?", "");
  let qs = {};
  search_string.split("&").forEach(i => {
    let t = i.split("=");
    qs[t[0]] = t[1];
  });
  return qs;
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

/* FORMATTERS */
$.addTemplateFormatter("ArtistsHrefFormatter", formatArtistHref);
$.addTemplateFormatter("ArtistsEventCountFormatter", formatArtistsEventCount);
$.addTemplateFormatter("ArtistWebsiteFormatter", formatArtistWebsite);
$.addTemplateFormatter("EventDateFormatter", formatEventDate);
$.addTemplateFormatter("EventsHrefFormatter", formatEventHref);
$.addTemplateFormatter("ArtistChipsFormatter", buildArtistChip);
$.addTemplateFormatter("EventTypeChipFormatter", formatEventTypeChip);

function formatArtistHref(value, template) {
  return `/pages/artist.html?id=${value}`;
}

function formatEventHref(value, template) {
  return `/pages/event.html?id=${value}`;
}

function formatArtistsEventCount(value, template) {
  return `${value} event${value == 1 ? "" : "s"}`;
}

function formatArtistWebsite(value, template) {
  return `http://${value}`; //Add http to url
}

function formatEventDate(value, template) {
  let d = new Date(value);
  return `${formatDate(d)} - ${d.getHours()}:${d.getMinutes()}`;
}

function buildArtistChip(value, template) {
  let html = "";
  value.forEach(a => {
    if (a)
      html += `<div class="mdl-chip"><div class="mdl-chip__text">${a}</div></div>`;
  });
  return html;
}

function formatEventTypeChip(value, template) {
  let types = EVENT_TYPES.map(e => e.id);
  return EVENT_TYPES[types.indexOf(value)].txt;
}

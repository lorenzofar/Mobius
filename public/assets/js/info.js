const INFO_PAGE_FRAGMENT = "/assets/fragments/informationPage.html";

$(document).ready( () => {
    $.get("/info").done(parseData).catch(handleError);
})

function parseData(data){
    $("#info-container").loadTemplate(INFO_PAGE_FRAGMENT, data);
}
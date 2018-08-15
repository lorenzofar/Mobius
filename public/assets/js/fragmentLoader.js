const BASE_FOLDER = "/assets/fragments/";

const fragments_rel = {
    /* Here we put fragments to be loaded for each element
    e.g. #container: fragment.html */
    "#header": "header.html"
}

$(document).ready(() => {
    Object.keys(fragments_rel).forEach(r => {
        let temp = null;
        (temp = $(r)) && temp.load(BASE_FOLDER + fragments_rel[r]);
    })
});
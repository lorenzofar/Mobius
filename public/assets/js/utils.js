function parseQueryString(search_string){
    search_string = search_string.replace("?", '');
    let qs = {};
    search_string.split("&").forEach(i => {
        let t = i.split("=");
        qs[t[0]] = t[1];
    });
    return qs;
}
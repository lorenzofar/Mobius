let typesColors = {
    "theatre": "#88C0D0",
    "music": "#D08770",
    "dance": "#A3BE8C",
    "side": "#B48EAD"
};

function getRandomColor(){
    let types = Object.keys(typesColors);
    let i = Math.floor(Math.random() * types.length);
    return getColor(types[i]);
}

function getColor(type){
    if(type in typesColors) return typesColors[type];
    else return null;
}
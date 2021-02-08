let pokemonList = [
    {
        name: "Pikachu",
        height: 1.2,
        type: ["electric"]
    },
    {
        name: "Blastoise",
        height: 2.0,
        type: ["water"]
    },
    {
        name: "<p class='special_pokemon'>Charizard</p>",
        height: 6.1,
        type: ["fire", "flying"]
    }
];

/*writing out the names and heights. I needed a lot of direction on this. 
Especially helpful knowing how to embed html into document, as I was struggling with this as well.  */
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 6) {
        document.write(
            pokemonList[i].name +
            " " +
            "<p>" +
            "Height: " +
            pokemonList[i].height +
            "(Wow that's big!)" +
            "</p>"
        );
    } else {
        document.write(
            pokemonList[i].name +
            " " +
            "<p>" +
            "Height: " +
            pokemonList[i].height +
            "</p>" +
            "<br/>"
        );
    }
}

/*attempting to make these grid items*/
let dataArray = pokemonList;
let numColumns = 3;
let grid = document.getElementById('grid');


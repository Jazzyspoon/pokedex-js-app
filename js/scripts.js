//IIFE instantiated
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Pikachu",
      height: 1.2,
      type: ["electric"],
    },
    {
      name: "Blastoise",
      height: 2.0,
      type: ["water"],
    },
    {
      name: "<p class='special_pokemon'>Charizard</p>",
      height: 6.1,
      type: ["fire", "flying"],
    },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

//foreach statement instead of for statement
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(
    pokemon.name +
      " " +
      "<p>" +
      "Height: " +
      pokemon.height +
      "</br>" +
      "Pokemon Type: " +
      pokemon.type +
      "</br>" +
      "</p>"
  );
});
/*attempting to make these grid items*/
//let dataArray = pokemonList;
//let numColumns = 3;
//let grid = document.getElementById('grid');

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
      name: "Charizard",
      height: 6.1,
      type: ["fire", " flying"],
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
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    "<p class='grid_item'>" +
      pokemon.name +
      " " +
      "<p>" +
      "Height: " +
      pokemon.height +
      "</br>" +
      "Type: " +
      pokemon.type +
      "</p>" +
      "</p>"
  );
});

/*attempting to make these grid items*/
//let dataArray = pokemonList;
//let numColumns = 3;
//let grid = document.getElementById('grid');

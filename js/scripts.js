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
function addListItem(pokemon) {
  let pokemonButtons = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText=  pokemon.name; 
  button.classList.add('buttons');
  listPokemon.appendChild(button);
  pokemonButtons.appendChild(listPokemon);
  //adding event to list pokemon name in console when clicked
  button.addEventListener("click", function () {
    showDetails(pokemon);
  })};

//function code for a later task
function showDetails(pokemon){
    console.log(pokemon.name)};

return {
   add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();


pokemonRepository.getAll().forEach(function (pokemon) { 
  pokemonRepository.addListItem(pokemon);
});










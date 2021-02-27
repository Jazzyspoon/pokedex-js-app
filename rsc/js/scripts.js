//IIFE instantiated
let pokemonRepository = (function () {
  let searchInput = document.querySelector(".search");
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  //add pokemon from pokemonList
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  //get all requested info from pokemonList
  function getAll() {
    return pokemonList;
  }
  //add information loaded from API
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listPokemon.classList.add("list-group-item");
    button.classList.add("btn-primary");
    button.classList.add("pokemon-list");
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-toggle", "modal");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    //adding event to list pokemon name in Modal function when clicked?
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  //loading from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //loading specific details from API url
  function loadDetails(item) {
    let url = item.detailsUrl;
    return (
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        //add details
        .then(function (details) {
          item.imageUrl = details.sprites.other.dream_world.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.abilities = details.abilities;
          item.types = details.types;
          item.moves = details.moves;
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }
  //show the modal
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();
    //defining the name element in the modal
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;
    //listing the hieght and wieght in the modal
    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;
    let weightElement = document.createElement("p");
    weightElement.innerText = "Weight: " + pokemon.weight;
    //run through abilities array
    let abilityElement = document.createElement("p");
    for (let i = 1; i < pokemon.abilities.length; i++) {
      abilityList = pokemon.abilities[i].ability.name;
    }
    abilityElement.innerText = "Abilities: " + abilityList;
    //listing the types array
    let typesElement = document.createElement("p");
    for (let i = 0; i < pokemon.types.length; i++) {
      typesList = pokemon.types[i].type.name;
    }
    typesElement.innerText = "Type: " + typesList;
    //loading moves button
    let movesElement = document.createElement("p");
    for (let i = 0; i < pokemon.types.length; i++) {
      movesList = pokemon.moves[i].move.name;
    }
    movesElement.innerText = "Move: " + movesList;
    //loading the image from the API
    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.innerHTML = imageElement.src;
    //load modal with requested information from pokemonRepository
    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilityElement);
    modalBody.append(typesElement);
    modalBody.append(movesElement);
    modalBody.append(imageElement);
  }
  //enabling search function for navbar
  searchInput.addEventListener("input", function () {
    let allPokemon = document.querySelectorAll(".btn-primary");
    let filterValue = searchInput.value.toUpperCase();
    allPokemon.forEach(function (item) {
      console.log(item.innerText);
      if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
  //return everything asked for
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
//call on all items from repository to show on DOM
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    {
    }
  });
});

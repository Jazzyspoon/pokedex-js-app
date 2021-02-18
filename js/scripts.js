//IIFE instantiated
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("buttons");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    //adding event to list pokemon name in console when clicked
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    let modalContainer = document.querySelector(".modal");
    modalContainer.innerHTML = "";
    pokemonRepository.loadDetails(item).then(function () {
      //define and place the modal
      let closeButtonElement = document.querySelector("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);
      let titleName = document.createElement("h1");
      titleName.innerHTML = "<h1>" + item.name + "</h1>";
      let pokemonHeight = document.createElement("p");
      pokemonHeight.innerText = "<p>" + "Hieght: " + item.height + "</p>";
      let pokemonTypes = document.createElement("p");
      pokemonTypes.innerText = "<p>" + "Types: " + item.type + "</p>";
      let pokemonAbility = document.createElement("p");
      pokemonAbility.innerHTML = "<p>" + "Abilities: " + item.ability + "</p>";
      let pokemonImage = document.ImageUrl("img");
      pokemonImage.imageUrl =
        "<img src=''" + item.imageUrl + "'alt~'" + item.name + ">";
    });

    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    modal.appendChild(pokemonAbility);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");

    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  //loading the API info
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
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
        //add deatils
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (itemAbilities) {
          item.abilities.push(itemAbilities.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // document.querySelector("#modal-container").addEventListener('click', () => {
  //   showModal();
  // });

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// })();
// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal(showDetails);
// });
// let modalContainer = document.querySelector('#modal.container');

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.loadDetails(pokemon);
  });
});

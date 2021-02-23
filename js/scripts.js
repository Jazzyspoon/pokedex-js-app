//IIFE instantiated
let pokemonRepository = (function () {
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
    button.classList.add("buttons");
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
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.abilities = details.abilities;
          item.types = details.types;
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
  //modal creation
  let modalContainer = document.querySelector("#modal-container");
  function showModal(pokemon) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);
    
    //defining the title element in the modal
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    //listing the content in the modal
    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + pokemon.height;

    //run through abilities array
    let abilityElement = document.createElement("p");
    for (let i = 1; i < pokemon.abilities.length; i++) {
      abilityList = pokemon.abilities[i].ability.name;
    }
    abilityElement.innerText = 'Abilities: ' + abilityList;

    //listing the types array
    let typesElement = document.createElement("p");
    for (let i = 0; i < pokemon.types.length; i++) {
      typesList = pokemon.types[i].type.name;
    }
    typesElement.innerText = 'Type: ' + typesList;

    

    //loading the image from the API
    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.innerHTML = imageElement.src;

    //load modal with requested information from pokemonRepository
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.append(abilityElement);
    modal.append(typesElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  let dialogPromiseReject;
  //hide modal function
  function hideModal() {
    modalContainer.classList.remove("is-visible");

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }
  ///close modal when escape key is pressed
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  //close the modal when you click outside the modal
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
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

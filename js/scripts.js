//IIFE instantiated
let pokemonRepository = (function () {
  let pokemonList = [];
     let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
  //add pokemon from pokemonList   
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
//get all requested from pokemonList
  function getAll() {
    return pokemonList;
  }
//add information loaded from API 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText=  pokemon.name; 
    button.classList.add("buttons");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  //adding event to list pokemon name in Modal function when clicked?
    button.addEventListener("click", function()  {
    showDetails(pokemon);
  });
}
 //loading from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url};
            add(pokemon);
            console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
  }
  //loading specific details from API url
  function loadDetails(item)  {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
    return response.json();
    //add deatils to the item
    }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    }).catch(function (e) {
    console.error(e);
    });
  }

function showDetails(item){
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}

  let modalContainer = document.querySelector ('#modal-container');
  function showModal(pokemon)  {
    modalContainer.innerHTML = '';
  let modal = document.createElement('div');
    modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
//defining the title element in the modal
  let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
//listing the content in the modal  
  let contentElement = document.createElement('p');
    contentElement.innerText = "Height: " + pokemon.height;
 //loading the image from the API   
  let imageElement = document.createElement('img');
    contentElement.innerText = "<img src=''></img>";
  
  //load modal with requested information from pokemonRepository
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
}

let dialogPromiseReject;

function hideModal()  {
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}
///close modal when escape key is pressed
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
//close the modal when you click outside the modal
modalContainer.addEventListener('click', (e) => {
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
  showDetails: showDetails
  };

})();

//call on all items from repository to show on DOM
pokemonRepository.loadList().then(function ()  {
  pokemonRepository.getAll().forEach(function (pokemon) { 
   pokemonRepository.addListItem(pokemon); {
     
   }
  });
});










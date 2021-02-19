//IIFE instantiated
let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal.container');
  let pokemonList = [];
     let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
     
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
    button.innerText=  pokemon.name; 
    button.classList.add("buttons");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  //adding event to list pokemon name in console when clicked
    button.addEventListener("click", function(event)  {
    showDetails(pokemon);
  });
}
 
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
  
  function loadDetails(item)  {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
    return response.json();
    //add deatils to the item
    }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types =details.types;
    }).catch(function (e) {
    console.error(e);
    });
  }

function showDetails(item){
  pokemonRepository.loadDetails(item).then(function () {
    document.querySelector(item);
  });
}
  
function showModal(title, text, image) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.querySelector('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText =  title;

  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = text;

  let pokemonPic = document.imageUrl('h2');
  pokemonPic.innerHTML = '#' && image;

modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonPic);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible')
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible')
  }
  
  function showDialog(title, text)  {
    
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal(details);
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
})();


  
// })();
// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal(showDetails);
// });
// let modalContainer = document.querySelector('#modal.container');






// pokemonRepository.loadList().then(function ()  {
//   pokemonRepository.getAll().forEach(function (pokemon) { 
//    pokemonRepository.addListItem(pokemon);
//   });
// });










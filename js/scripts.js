//IIFE instantiated
let pokemonRepository = (function () {
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
            // console.log(pokemon);
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
    console.log(item);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };
})();

let pokemonModal = (function(){
  let modalContainer = document.querySelector ('#modal-container');
  function showModal(title, text)  {
    modalContainer.innerHTML = '';
  let modal = document.createElement('div');
    modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
  let contentElement = document.createElement('p');
    contentElement.innerText = text;
  
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  
  modalContainer.classList.add('is-visible');
}

let dialogPromiseReject;


function hideModal()  {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

function showDialog(title, text) {
  showModal(title, text);

let modal = modalContainer.querySelector('.modal');

let confirmButton = document.createElement('button');
confirmButton.classList.add('modal-confirm');
confirmButton.innerText = 'Confirm';

let cancelButton = document.createElement('button');
cancelButton.classList.add('modal-cancel');
cancelButton.innerText = 'Cancel';

modal.appendChild(confirmButton);
modal.appendChild(cancelButton);

confirmButton.focus();
return new Promise((resolve, reject) => {
cancelButton.addEventListener('click', hideModal);
confirmButton.addEventListener('click', () => {
    dialogPromiseReject = null;
    hideModal();
    resolve();
});
      dialogPromiseReject = reject;
});
}

document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible'))  {
    hideModal();
  }
  });

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

})();

pokemonRepository.loadList().then(function ()  {
  pokemonRepository.getAll().forEach(function (pokemon) { 
   pokemonRepository.addListItem(pokemon);
  });
});










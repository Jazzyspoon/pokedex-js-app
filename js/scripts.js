let pokemonList = [{
    name: 'Pikachu',
    height: 1.2,
    type: ['electric']
}   , {
    name: '<p>Blastois</p>',
    height: 2.0,
    type: ['water']
}, {
    name: '<p class="special_pokemon">Charizard</p>',
    height: 6.1,
    type: ['fire', 'flying']
}];

/*writing out the names and heights*/
for (let i=0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + '<p> hieght: </p>' + pokemonList[i].height);
} 

/*attempting to make these grid items*/
 let dataArray = pokemonList; // assuming data from API
    let numColumns = 4; // set number of columns    
    let grid = document.getElementById('grid-wrapper');

 /*attempting to write that's a big pokemon*/   
 for (let height = 6.0; height.length > 6.0; height++)  {
        document.write(pokemonList[i].name + ' hieght: ' + pokemonList[i].height + ' ' + 'thats a big pokemon!'); 
    }





let pokemonList = [{
    name: 'Pikachu',
    height: 1.2,
    type: ['electric']
}, {
    name: 'Blastois',
    height: 2.0,
    type: ['water']
}, {
    name: 'Charizard',
    height: 6.1,
    type: ['fire', 'flying']
}];

/*printing out the names*/
for (let i=0; i < pokemonList.length; i++) {
   document.write(pokemonList[i].name + 'hieght:' + pokemonList[i].height);
}







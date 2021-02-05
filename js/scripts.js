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

if (pokemonList.type === 'electric' || pokemonList.height === 1.2) {
    console.log('Pikachu!');
} else {
    console.log('Not pikachu!');
}

if (pokemonList.type === 'water' || pokemonList.height === 2.0) {
    console.log('Blastois!');
} else {
    console.log('Not Blastois!');
}

if (pokemonList.type === 'fire' || 'flying' || pokemonList.height === 6.1) {
    console.log('Charizard!');
} else {
    console.log('Not Charizard!');
}






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


for (let i=0 ; i > pokemonList.length; i++);
    if (pokemonList[0].type = 'electric' && pokemonList[0].height === 1.2) {
    document.write('Pikachu (height:1.2)   ');
    } else {
    document.write('Not Pikachu!');
}

for (let i=0; i < pokemonList.length; i++);
    if (pokemonList[1] === 'water' || pokemonList[1].height === 2.0) {
    document.write('Blastois (height:2.0)   ');
    } else {
    document.write('Not Blastois!');
}

for (let i=0; i < pokemonList.length; i++);
    if (pokemonList[2].type = 'fire' || 'flying' && pokemonList[2].height === 6.1) {
    document.write('Charizard (height:6.1)    ');
    } else {
    document.write('Not Charizard!');
    }   






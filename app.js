const pokeCardTemplate = document.querySelector('[poke-card-template]');
const pokeCardContainer = document.querySelector('[poke-card-container]');
const searchPokemon = document.querySelector('[search-box]');

let pokemonData = [];

searchPokemon.addEventListener('input',(word) => {
    let search = word.target.value.toLowerCase();
    
    pokemonData.forEach(data => {
        const visible = data.pokeName.includes(search) || data.pokeId == Number(search);

        data.element.classList.toggle('no-visible', !visible);
    })
})

fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
.then(response => response.json())
.then(data => {
    const pokeArray = data.results;

    pokeArray.forEach(pokemon => {
        fetch(pokemon.url)
        .then(res => res.json())
        .then(pokeInfo => {
            const pokeCard = pokeCardTemplate.content.cloneNode(true).children[0];
            const img = pokeCard.querySelector('[poke-img]');
            const name = pokeCard.querySelector('[poke-name]');
            const type = pokeCard.querySelector('[poke-type]');

            name.textContent = pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1);
            const id = pokeInfo.id;
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.id}.png`;

            if (pokeInfo.types.length > 1) {
                type.textContent = pokeInfo.types[0].type.name.charAt(0).toUpperCase() + pokeInfo.types[0].type.name.slice(1) + ' | ' + pokeInfo.types[1].type.name.charAt(0).toUpperCase() + pokeInfo.types[1].type.name.slice(1);

            }
            else {
                type.textContent = pokeInfo.types[0].type.name.charAt(0).toUpperCase() + pokeInfo.types[0].type.name.slice(1);
            }

            pokeCard.setAttribute('id', `${pokeInfo.types[0].type.name}`);

            pokeCardContainer.append(pokeCard);

            pokemonData.push({pokeName: pokeInfo.name, pokeId: pokeInfo.id, element: pokeCard});
        })
        
    })
})

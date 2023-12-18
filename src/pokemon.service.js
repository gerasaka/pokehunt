export class PokemonService {
  getPokemonList() {
    return fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .catch((e) => {
        console.log("error when getting pokemon list", e);
      });
  }

  generatePokemonDetails(list) {
    const pokemonListWithDetails = [];
    list.forEach((pokemon, i) => (pokemonListWithDetails[i] = fetch(pokemon.url)));
    return pokemonListWithDetails;
  }

  searchPokemon(query) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then((res) => res.json());
  }

  catchPokemon() {}

  savePokemon() {}

  releasePokemon() {}

  releaseAllPokemon() {}
}

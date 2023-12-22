export class PokemonService {
  pokemonList = [];
  next = null;
  prev = null;

  fetchPokemonList(listUrl) {
    return fetch(listUrl)
      .then((response) => response.json())
      .then((data) => {
        this.next = data.next;
        this.prev = data.prev;
        return data.results;
      })
      .catch((e) => console.log("error when getting pokemon list", e));
  }

  async fetchPokemonDetails(detailsUrl) {
    try {
      const response = await fetch(detailsUrl);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("error when getting pokemon list", e);
    }
  }

  cleanPokemonDetails(details) {
    return {
      id: details.id,
      name: details.name,
      details: {
        height: details.height,
        weight: details.weight,
        stats: details.stats.map((stat) => ({
          name: stat.stat.name,
          base: stat.base_stat,
        })),
        imageUrl: details.sprites.front_default,
      },
    };
  }

  async generatePokemonList(listUrl = "https://pokeapi.co/api/v2/pokemon") {
    try {
      const listResult = await this.fetchPokemonList(listUrl);
      this.pokemonList = await Promise.all(
        listResult.map(async (pokemon) => {
          const details = await this.fetchPokemonDetails(pokemon.url);
          return this.cleanPokemonDetails(details);
        }),
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  searchPokemon(query) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then((res) => res.json());
  }

  catchPokemon() {}

  savePokemon() {}

  releasePokemon() {}

  releaseAllPokemon() {}
}

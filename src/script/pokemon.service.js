export class PokemonService {
  pokemonList = [];
  next = null;
  previous = null;
  _activePage = {
    number: 1,
    listUrl: "",
  };

  get currentPage() {
    return this._activePage.number;
  }

  set currentPage(val) {
    this._activePage.number = val;
  }

  get activeListUrl() {
    return this._activePage.listUrl;
  }

  checkSession() {
    const rawSession = sessionStorage.getItem("pokeSession");

    if (rawSession) {
      const pokeSession = JSON.parse(rawSession);
      this._activePage = pokeSession.activePage;
      return true;
    } else return false;
  }

  #setSession(url) {
    const pokeSession = {
      activePage: {
        number: this._activePage.number,
        listUrl: url,
      },
    };

    sessionStorage.setItem("pokeSession", JSON.stringify(pokeSession));
  }

  get pokemonDetails() {
    const rawDetails = sessionStorage.getItem("pokeDetails");
    if (rawDetails) return JSON.parse(rawDetails);
    else return {};
  }

  set pokemonDetails(details) {
    sessionStorage.setItem("pokeDetails", JSON.stringify(details));
  }

  fetchPokemonList(listUrl) {
    return fetch(listUrl)
      .then((response) => response.json())
      .then((data) => {
        this.next = data.next;
        this.previous = data.previous;
        return data.results;
      })
      .catch((e) => console.error("error when getting pokemon list", e));
  }

  async fetchPokemonDetails(detailsUrl) {
    try {
      const response = await fetch(detailsUrl);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("error when getting pokemon list", e);
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
        abilities: details.abilities.map((ability) => ability.ability.name),
      },
    };
  }

  async generatePokemonList(listUrl = "https://pokeapi.co/api/v2/pokemon") {
    try {
      const listResult = await this.fetchPokemonList(listUrl);
      this.#setSession(listUrl);

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

  static catchPokemon() {}

  savePokemon() {}

  releasePokemon() {}

  releaseAllPokemon() {}
}

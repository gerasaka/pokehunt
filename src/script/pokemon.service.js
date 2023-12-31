export class PokemonService {
  pokemonList = [];
  next = null;
  previous = null;
  last = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  lastPageNumber = 0;
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
        const lastPage = Math.ceil(data.count / 20);

        this.next = data.next;
        this.previous = data.previous;
        this.last = `https://pokeapi.co/api/v2/pokemon?offset=${(lastPage - 1) * 20}&limit=20`;
        this.lastPageNumber = lastPage;
        return data.results;
      })
      .catch((e) => console.error("error when getting pokemon list", e));
  }

  async fetchPokemonDetails(detailsUrl) {
    try {
      const response = await fetch(detailsUrl);
      return await response.json();
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
        abilities: details.abilities.map((ability) => ability.ability.name),
      },
      sprites: {
        img: details.sprites.front_default,
        official: details.sprites.other["official-artwork"].front_default,
        animated: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${details.id}.gif`,
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

  async searchPokemon(query) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  }
}

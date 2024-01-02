import "./components/error-modal";
import "./components/not-found-modal";
import "./components/pagination";
import "./components/poke-card";

import { PaginationService } from "./pagination";
import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();
const paginationService = new PaginationService(pokemonService);

const listContainer = document.getElementById("list-container");
const notFoundModal = document.querySelector("not-found-modal");
export const errorModal = document.querySelector("error-modal");

const searchInput = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", handleSearch);

export const renderPokemonList = () => {
  const listItem = (pokemon, index) => {
    const pokeCard = document.createElement("poke-card");
    pokeCard.setAttribute("image", pokemon.sprites.official);
    pokeCard.setAttribute("name", snakeToTitleCase(pokemon.name));
    pokeCard.setAttribute("href", `http://localhost:8080/details.html?id=${index}`);

    pokeCard.addEventListener("click", () => (pokemonService.pokemonDetails = pokemon));

    return pokeCard;
  };

  /** reset pokemon list */
  listContainer.innerHTML = "";

  pokemonService.pokemonList.forEach((pokemon, i) => {
    listContainer.appendChild(listItem(pokemon, i));
  });

  paginationService.setPagination();
};

export const renderLoadingState = () => {
  listContainer.innerHTML = Array(20)
    .fill('<div class="mt-8 rounded-lg skeleton h-36 md:h-40 w-full"></div>')
    .join("");
};

async function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (query === "") {
    await pokemonService.generatePokemonList();
    return;
  }

  const res = await pokemonService.searchPokemon(query);

  if (res.status === 200) {
    const data = pokemonService.cleanPokemonDetails(await res.json());
    pokemonService.pokemonDetails = data;
    window.location.href = `http://localhost:8080/details.html?id=${data.id}`;
  } else if (res.status === 404) {
    notFoundModal.showModal();
  } else errorModal.showModal();
}

const main = async () => {
  renderLoadingState();

  if (pokemonService.checkSession()) {
    await pokemonService.generatePokemonList(pokemonService.activeListUrl);
  } else await pokemonService.generatePokemonList();

  renderPokemonList();
  paginationService.initiatePagination();
};

document.addEventListener("DOMContentLoaded", main);

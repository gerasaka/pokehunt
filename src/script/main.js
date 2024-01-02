import { PaginationService } from "./pagination";
import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();
const paginationService = new PaginationService(pokemonService);

const listContainer = document.getElementById("list-container");
const notFoundModal = document.getElementById("not-found-modal");
export const errorModal = document.getElementById("error-modal");

const searchInput = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", handleSearch);

export const loadPokemonList = () => {
  const listItem = (pokemon, index) => {
    const container = document.createElement("a");
    container.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-secondary hover:text-primary mt-8 rounded-lg border p-3 transition hover:shadow-xl",
    );
    container.setAttribute("href", `http://localhost:8080/details.html?id=${index}`);
    container.addEventListener("click", () => (pokemonService.pokemonDetails = pokemon));

    container.innerHTML = `
      <img
        src=${pokemon.sprites.official}
        alt="image of ${pokemon.name}"
        class="w-full"
        style="margin-top: -35%"
      />
      <h2 class="text-center text-xl font-bold md:text-2xl">${snakeToTitleCase(pokemon.name)}</h2>
    `;

    return container;
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

  loadPokemonList();
  paginationService.initiatePagination();
};

document.addEventListener("DOMContentLoaded", main);

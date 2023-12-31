import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();

const listContainer = document.getElementById("list-container");

// Pagination variables
const currIndicator = document.getElementById("curr-page");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const firstBtn = document.getElementById("first-btn");
const lastBtn = document.getElementById("last-btn");

// Search variables
const searchInput = document.getElementById("search-input");
const notFoundModal = document.getElementById("not-found-modal");
const errorModal = document.getElementById("error-modal");
document.getElementById("search-btn").addEventListener("click", searchPokemon);

const loadPokemonList = () => {
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

  setNavigation();
};

const setNavigation = () => {
  if (pokemonService.currentPage === 1) firstBtn.disabled = true;
  else firstBtn.disabled = false;

  if (pokemonService.currentPage === pokemonService.lastPageNumber) lastBtn.disabled = true;
  else lastBtn.disabled = false;

  if (pokemonService.previous) prevBtn.disabled = false;
  else prevBtn.disabled = true;

  if (pokemonService.next) nextBtn.disabled = false;
  else nextBtn.disabled = true;

  currIndicator.innerHTML = `Page ${pokemonService.currentPage}`;
};

const renderLoadingState = () => {
  listContainer.innerHTML = Array(20)
    .fill('<div class="mt-8 rounded-lg skeleton h-36 md:h-40 w-full"></div>')
    .join("");
};

const changePage = (endpoint, setPageNumber, revertPageNumber) => {
  renderLoadingState();
  setPageNumber();

  pokemonService
    .generatePokemonList(endpoint)
    .then(() => loadPokemonList())
    .catch(() => {
      revertPageNumber();
      errorModal.showModal();
    });
};

async function searchPokemon() {
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

  const sessionPageNumber = () => {
    return JSON.parse(sessionStorage.getItem("pokeSession")).activePage;
  };

  prevBtn.addEventListener("click", () =>
    changePage(
      pokemonService.previous,
      () => (pokemonService.currentPage -= 1),
      () => (pokemonService.currentPage += 1),
    ),
  );
  nextBtn.addEventListener("click", () =>
    changePage(
      pokemonService.next,
      () => (pokemonService.currentPage += 1),
      () => (pokemonService.currentPage -= 1),
    ),
  );
  firstBtn.addEventListener("click", () =>
    changePage(
      `https://pokeapi.co/api/v2/pokemon`,
      () => (pokemonService.currentPage = 1),
      () => (pokemonService.currentPage = sessionPageNumber()),
    ),
  );
  lastBtn.addEventListener("click", () =>
    changePage(
      pokemonService.last,
      () => (pokemonService.currentPage = pokemonService.lastPageNumber),
      () => (pokemonService.currentPage = sessionPageNumber()),
    ),
  );
};

document.addEventListener("DOMContentLoaded", main);

import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();

const listContainer = document.getElementById("list-container");

const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");
const currIndicator = document.getElementById("curr-page");

const searchInput = document.getElementById("search-input");
document.getElementById("search-btn").addEventListener("click", searchPokemon);

const loadPokemonList = () => {
  const listItem = (pokemon, index) => {
    const container = document.createElement("a");
    container.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-ph-blue hover:text-ph-yellow mt-8 rounded-lg border p-3 transition hover:shadow-xl",
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

  if (pokemonService.previous) prevbtn.removeAttribute("disabled");
  if (pokemonService.next) nextbtn.removeAttribute("disabled");
  currIndicator.innerHTML = `Page ${pokemonService.currentPage}`;
};

const prev = () => {
  pokemonService.currentPage -= 1;
  pokemonService
    .generatePokemonList(pokemonService.previous)
    .then(() => loadPokemonList())
    .catch((e) => {
      pokemonService.currentPage += 1;
      console.error("error when get previous data", e);
    });
};

const next = () => {
  pokemonService.currentPage += 1;
  pokemonService
    .generatePokemonList(pokemonService.next)
    .then(() => loadPokemonList())
    .catch((e) => {
      pokemonService.currentPage -= 1;
      console.error("error when get next data", e);
    });
};

async function searchPokemon() {
  const query = searchInput.value.toLowerCase().trim();

  if (query === "") {
    await pokemonService.generatePokemonList();
    return;
  }

  try {
    const data = await pokemonService.searchPokemon(query);
    pokemonService.pokemonDetails = data;
    window.location.href = `http://localhost:8080/details.html?id=${data.id}`;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Pokémon not found. Please try another search term.");
  }
}

const main = async () => {
  if (pokemonService.checkSession()) {
    await pokemonService.generatePokemonList(pokemonService.activeListUrl);
  } else await pokemonService.generatePokemonList();

  loadPokemonList();

  prevbtn.addEventListener("click", prev);
  nextbtn.addEventListener("click", next);
};

document.addEventListener("DOMContentLoaded", main);

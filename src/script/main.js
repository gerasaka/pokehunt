import { PokemonService } from "./pokemon.service";

const pokemonService = new PokemonService();

const listContainer = document.getElementById("list-container");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");
const currIndicator = document.getElementById("curr-page");

const loadPokemonList = () => {
  const listItem = (pokemon, index) => {
    const container = document.createElement("a");
    container.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-ph-blue hover:text-ph-yellow mt-8 rounded-lg border transition hover:shadow-xl p-3",
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
      <h2 class="text-center text-xl font-bold md:text-2xl">${pokemon.name}</h2>
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

const main = async () => {
  if (pokemonService.checkSession()) {
    await pokemonService.generatePokemonList(pokemonService.activeListUrl);
  } else await pokemonService.generatePokemonList();

  loadPokemonList();

  prevbtn.addEventListener("click", prev);
  nextbtn.addEventListener("click", next);
};

document.addEventListener("DOMContentLoaded", main);

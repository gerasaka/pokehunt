import { PokemonService } from "./pokemon.service";

const pokemonService = new PokemonService();

const listContainer = document.getElementById("list-container");
const prevbtn = document.getElementById("prev-btn");
const nextbtn = document.getElementById("next-btn");
const currIndicator = document.getElementById("curr-page");

let currentPage = 1;

const loadPokemonList = () => {
  const listItem = (pokemon) => {
    const container = document.createElement("a");
    container.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-ph-blue hover:text-ph-yellow mt-8 rounded-lg border transition hover:shadow-xl p-3",
    );

    container.innerHTML = `
      <img
        src=${pokemon.details.imageUrl}
        alt="image of ${pokemon.name}"
        class="w-full"
        style="margin-top: -35%"
      />
      <h2 class="text-center text-xl font-bold md:text-2xl lg:text-3xl">${pokemon.name}</h2>
    `;

    return container;
  };

  /** reset pokemon list */
  listContainer.innerHTML = "";

  pokemonService.pokemonList.forEach((pokemon) => {
    listContainer.appendChild(listItem(pokemon));
  });

  if (pokemonService.previous) prevbtn.removeAttribute("disabled");
  if (pokemonService.next) nextbtn.removeAttribute("disabled");
};

const prev = () => {
  pokemonService
    .generatePokemonList(pokemonService.previous)
    .then(() => {
      loadPokemonList();
      currentPage -= 1;
      currIndicator.innerHTML = `Page ${currentPage}`;
    })
    .catch((e) => console.log("error when get previous data", e));
};

const next = () => {
  pokemonService
    .generatePokemonList(pokemonService.next)
    .then(() => {
      loadPokemonList();
      currentPage += 1;
      currIndicator.innerHTML = `Page ${currentPage}`;
    })
    .catch((e) => console.log("error when get next data", e));
};

const main = async () => {
  await pokemonService.generatePokemonList();
  loadPokemonList();

  prevbtn.addEventListener("click", prev);
  nextbtn.addEventListener("click", next);
};

export default main;

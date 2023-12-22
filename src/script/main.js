import { PokemonService } from "./pokemon.service";

const pokemonService = new PokemonService();

const main = async () => {
  await pokemonService.generatePokemonList();
  const listContainer = document.getElementById("list-container");

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

  pokemonService.pokemonList.forEach((pokemon) => {
    listContainer.appendChild(listItem(pokemon));
  });
};

export default main;

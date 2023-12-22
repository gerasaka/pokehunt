import { PokemonService } from "./pokemon.service";

const pokemonService = new PokemonService();

const main = () => {
  pokemonService.generatePokemonList();
};

export default main;

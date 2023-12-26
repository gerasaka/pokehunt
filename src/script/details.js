import { PokemonService } from "./pokemon.service";

const pokemonService = new PokemonService();

const main = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = pokemonService.pokemonDetails;

  if (!queryParams.has("id") || data === "") window.location.href = "http://localhost:8080";

  console.log(pokemonService.pokemonDetails);
  console.log(queryParams.get("id"));
};

document.addEventListener("DOMContentLoaded", main);

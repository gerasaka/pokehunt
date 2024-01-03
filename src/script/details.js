import "./components/ability-list";
import "./components/basic-info-card";
import "./components/stat-list";

import { SCENERY } from "./constant/scenery";
import { PokemonService } from "./utils/pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();

const basicInfoWrapper = document.getElementById("basic-info");
const abilityWrapper = document.getElementById("ability-wrapper");
const statsWrapper = document.getElementById("stats-wrapper");

const renderHeader = ({ name, details, sprites, id }) => {
  document
    .getElementById("scenery")
    .setAttribute("src", SCENERY[Math.floor(Math.random() * 4) + 1]);
  document.querySelector("h1").innerHTML = snakeToTitleCase(name);

  const spriteImg = document.getElementById("pokemon-sprite");
  spriteImg.setAttribute(
    "src",
    sprites.animated ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  );
  spriteImg.setAttribute("alt", `${name} image`);

  const infoCard = document.createElement("basic-info-card");
  infoCard.setAttribute("height", details.height);
  infoCard.setAttribute("weight", details.weight);

  basicInfoWrapper.appendChild(infoCard);
};

const renderAbilities = () => {
  const abilityList = document.createElement("ability-list");
  abilityWrapper.appendChild(abilityList);
};

const renderStatistic = () => {
  const statList = document.createElement("stat-list");
  statsWrapper.appendChild(statList);
};

const details = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = pokemonService.pokemonDetails;

  if (!queryParams.has("id") || data.id === undefined) {
    window.location.href = `${window.location.protocol}//${window.location.host}`;
  }

  renderHeader(data);
  renderAbilities(data.details.abilities);
  renderStatistic(data.details.stats);
};

document.addEventListener("DOMContentLoaded", details);

import "./components/basic-info-card";
import "./components/stat-card";
import "./components/stat-list";

import { SCENERY } from "./constant/scenery";
import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();

const basicInfoWrapper = document.getElementById("basic-info");
const abilityContainer = document.getElementById("ability-container");
const statsWrapper = document.getElementById("stats-wrapper");

const renderHeader = ({ name, details, sprites }) => {
  document
    .getElementById("scenery")
    .setAttribute("src", SCENERY[Math.floor(Math.random() * 4) + 1]);
  document.querySelector("h1").innerHTML = snakeToTitleCase(name);

  const spriteImg = document.getElementById("pokemon-sprite");
  spriteImg.setAttribute("src", sprites.animated);
  spriteImg.setAttribute("alt", `${name} image`);

  const infoCard = document.createElement("basic-info-card");
  infoCard.setAttribute("height", details.height);
  infoCard.setAttribute("weight", details.weight);

  basicInfoWrapper.appendChild(infoCard);
};

const renderAbilities = (abilities) => {
  const createBadge = (ability) => {
    const el = document.createElement("p");
    el.setAttribute("class", "badge badge-ghost badge-lg");
    el.innerText = snakeToTitleCase(ability);

    return el.outerHTML;
  };

  abilityContainer.innerHTML = `
    <h2 class="text-secondary mb-4 text-xl font-bold">Abilities</h2>
    <div class="flex gap-2 flex-wrap">
      ${abilities.map(createBadge).join("")}
    </div>
  `;
};

const renderStatistic = () => {
  const statList = document.createElement("stat-list");
  statsWrapper.appendChild(statList);
};

const details = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = pokemonService.pokemonDetails;

  if (!queryParams.has("id") || data.id === undefined) {
    window.location.href = "http://localhost:8080";
  }

  renderHeader(data);
  renderAbilities(data.details.abilities);
  renderStatistic(data.details.stats);
};

document.addEventListener("DOMContentLoaded", details);

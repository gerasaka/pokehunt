import "./components/basic-info-card";

import { SP_ATTACK_EL, SP_DEFENSE_EL } from "./constant/details";
import { SCENERY } from "./constant/scenery";
import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

const pokemonService = new PokemonService();

const basicInfoWrapper = document.getElementById("basic-info");
const abilityContainer = document.getElementById("ability-container");
const basicStatsContainer = document.getElementById("basic-stats");
const specialStatsContainer = document.getElementById("special-stats");

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

const renderStatistic = (stats) => {
  const basicStats = [];
  const specialStats = [];

  stats.forEach((stat) => {
    if (stat.name === "special-attack" || stat.name === "special-defense") specialStats.push(stat);
    else basicStats.push(stat);
  });

  const createBasicStatItem = ({ name, base }) => {
    const el = document.createElement("div");
    el.setAttribute("class", "rounded-xl border p-3");

    el.innerHTML = `
      <p class="mb-1">${snakeToTitleCase(name)}</p>
      <div class="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="255"
          value="${base}"
          class="range range-primary range-xs"
          disabled
        />
        <p class="text-secondary text-right text-3xl font-bold">${base}</p>
      </div>
    `;

    return el.outerHTML;
  };

  basicStatsContainer.innerHTML = basicStats.map(createBasicStatItem).join("");
  specialStatsContainer.appendChild(SP_ATTACK_EL(specialStats[0].base));
  specialStatsContainer.appendChild(SP_DEFENSE_EL(specialStats[1].base));
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

import { SP_ATTACK_EL, SP_DEFENSE_EL } from "./constant/details";
import { SCENERY } from "./constant/scenery";
import { PokemonService } from "./pokemon.service";
import { snakeToTitleCase } from "./utils/string";

import "../assets/scenery-1.jpg";
import "../assets/scenery-2.jpg";
import "../assets/scenery-3.jpg";
import "../assets/scenery-4.jpg";

const pokemonService = new PokemonService();

const detailsContent = document.getElementById("details-content");

const loadHeader = ({ name, details, sprites }) => {
  document
    .getElementById("scenery")
    .setAttribute("src", SCENERY[Math.floor(Math.random() * 4) + 1]);
  document.querySelector("h1").innerHTML = snakeToTitleCase(name);

  const spriteImg = document.getElementById("pokemon-sprite");
  spriteImg.setAttribute("src", sprites.animated);
  spriteImg.setAttribute("alt", `${name} image`);

  const wrapper = document.createElement("div");
  const heightInFt = ((details.height / 10) * 3.281).toFixed(1);
  const weightInLbs = Math.floor((details.weight / 10) * 2.205);

  wrapper.setAttribute(
    "class",
    "border-ph-dark-blue mx-auto flex max-w-sm gap-3 rounded-xl border p-4",
  );
  wrapper.innerHTML = `
    <span class="flex-1">
      <p>Height</p>
      <p class="inline text-lg font-bold">${details.height / 10} m</p>
      <p class="inline text-sm text-gray-500">( ${heightInFt} ft )</p>
    </span>
    <span class="bg-ph-dark-blue h-10 w-px self-center"></span>
    <span class="flex-1 text-right">
      <p class="text-right">Weight</p>
      <p class="inline text-lg font-bold">${details.weight / 10} kg</p>
      <p class="inline text-sm text-gray-500">( ${weightInLbs} lbs )</p>
    </span>
  `;

  detailsContent.appendChild(wrapper);
};

const loadAbilities = (abilities) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "my-8 flex flex-col items-center");

  const createBadge = (ability) => {
    const el = document.createElement("p");
    el.setAttribute("class", "badge border-none bg-gray-200 badge-lg");
    el.innerText = snakeToTitleCase(ability);

    return el.outerHTML;
  };

  wrapper.innerHTML = `
    <h2 class="text-ph-blue mb-4 text-xl font-bold">Abilities</h2>
    <div class="flex gap-2 flex-wrap">
      ${abilities.map(createBadge).join("")}
    </div>
  `;

  detailsContent.appendChild(wrapper);
};

const loadStatistic = (stats) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = '<h2 class="text-ph-blue mb-4 text-center text-xl font-bold">Statistics</h2>';
  const statsContainer = document.createElement("div");
  statsContainer.setAttribute("class", "grid grid-cols-1 gap-6 md:grid-cols-3");
  const basicStat = document.createElement("div");
  basicStat.setAttribute("class", "grid grid-cols-2 gap-6 md:col-span-2");
  const specialStat = document.createElement("div");
  specialStat.setAttribute("class", "grid grid-cols-2 gap-6 md:grid-cols-1");

  const basicStats = [];
  const specialStats = [];

  stats.forEach((stat) => {
    if (stat.name === "special-attack" || stat.name === "special-defense") specialStats.push(stat);
    else basicStats.push(stat);
  });

  const createStatItem = ({ name, base }) => {
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
        <p class="text-ph-blue text-right text-3xl font-bold">${base}</p>
      </div>
    `;

    return el.outerHTML;
  };

  basicStat.innerHTML = `
      ${basicStats.map(createStatItem).join("")}

  `;

  specialStat.appendChild(SP_ATTACK_EL(specialStats[0].base));
  specialStat.appendChild(SP_DEFENSE_EL(specialStats[1].base));

  statsContainer.appendChild(basicStat);
  statsContainer.appendChild(specialStat);
  wrapper.appendChild(statsContainer);

  detailsContent.appendChild(wrapper);
};

const main = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = pokemonService.pokemonDetails;

  if (!queryParams.has("id") || data.id === undefined) {
    window.location.href = "http://localhost:8080";
  }

  loadHeader(data);
  loadAbilities(data.details.abilities);
  loadStatistic(data.details.stats);
};

document.addEventListener("DOMContentLoaded", main);

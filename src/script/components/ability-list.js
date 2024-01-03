import { snakeToTitleCase } from "../utils/string";

export class AbilityList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  createStatItem(label, value, type) {
    const statItem = document.createElement("stat-card");
    statItem.setAttribute("label", label);
    statItem.setAttribute("val", value);
    statItem.setAttribute("stat-type", type);

    return statItem.outerHTML;
  }

  get abilities() {
    const rawDetails = sessionStorage.getItem("pokeDetails");
    if (rawDetails) return JSON.parse(rawDetails).details.abilities;
    else return [];
  }

  createBadge(ability) {
    const el = document.createElement("p");
    el.setAttribute("class", "badge badge-ghost badge-lg");
    el.innerText = snakeToTitleCase(ability);

    return el.outerHTML;
  }

  render() {
    this.innerHTML = `
      <h2 class="text-secondary mb-4 text-xl font-bold text-center">Abilities</h2>
      <div class="flex gap-2 flex-wrap">
        ${this.abilities.map(this.createBadge).join("")}
      </div>
    `;
  }
}

customElements.define("ability-list", AbilityList);

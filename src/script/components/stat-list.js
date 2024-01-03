export class StatList extends HTMLElement {
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

  get stats() {
    const rawDetails = sessionStorage.getItem("pokeDetails");
    if (rawDetails) return JSON.parse(rawDetails).details.stats;
    else return [];
  }

  render() {
    this.innerHTML = `
      <h2 class="mb-4 text-center text-xl font-bold text-secondary">Statistics</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div id="basic-stats" class="grid grid-cols-2 gap-6 md:col-span-2"></div>
        <div id="special-stats" class="grid grid-cols-2 gap-6 md:grid-cols-1"></div>
      </div>
    `;

    const basicStats = [];
    const specialStats = [];

    this.stats.forEach((stat) => {
      if (stat.name === "special-attack" || stat.name === "special-defense")
        specialStats.push(stat);
      else basicStats.push(stat);
    });

    this.querySelector("#basic-stats").innerHTML = basicStats
      .map(({ name, base }) => this.createStatItem(name, base, "basic"))
      .join("");

    this.querySelector("#special-stats").innerHTML = specialStats
      .map(({ name, base }) => this.createStatItem(name, base, "special"))
      .join("");
  }
}

customElements.define("stat-list", StatList);

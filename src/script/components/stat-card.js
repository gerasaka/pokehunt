import { ICON_SPECIAL } from "../constant/icons";
import { snakeToTitleCase } from "../utils/string";

export class StatCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute("label");
    const value = this.getAttribute("val");
    const type = this.getAttribute("stat-type");

    if (type === "basic") {
      this.setAttribute("class", "rounded-xl border p-3");

      this.innerHTML = `
        <p class="mb-1">${snakeToTitleCase(label)}</p>
        <div class="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="255"
            value="${value}"
            class="range range-primary range-xs"
            disabled
          />
          <p class="text-secondary text-right text-3xl font-bold">${value}</p>
        </div>
      `;
    } else {
      this.setAttribute("class", "bg-primary rounded-xl p-3");

      this.innerHTML = `
        <p class="mb-1">${snakeToTitleCase(label)}</p>
        <div class="flex items-center justify-between gap-4">
          ${ICON_SPECIAL[label]}
          <input
            type="range"
            min="0"
            max="255"
            value="${value}"
            class="range range-secondary range-xs"
            disabled
          />
          <p class="text-3xl font-bold">${value}</p>
        </div>
      `;
    }
  }
}

customElements.define("stat-card", StatCard);

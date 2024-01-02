import "./paginate-button";

export class PaginationBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("class", "flex items-center justify-center gap-4");
    this.innerHTML = `
      <page-button id="first-btn"></page-button>
      <page-button id="prev-btn"></page-button>

      <!-- Current page indicator -->
      <div class="p-3 text-center font-bold" id="curr-page"></div>

      <page-button id="next-btn"></page-button>
      <page-button id="last-btn"></page-button>
    `;
  }
}

customElements.define("pagination-bar", PaginationBar);

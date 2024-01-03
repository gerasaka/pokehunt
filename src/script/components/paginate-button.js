import { ICON } from "../constant/icons";

export class PaginateButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  // eslint-disable-next-line no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  static get observedAttributes() {
    return ["id", "disabled"];
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  set disabled(val) {
    this.querySelector("button").disabled = val;
  }

  render() {
    const id = this.getAttribute("id");

    this.innerHTML = `
      <button
        class="group btn btn-circle btn-outline btn-secondary disabled:bg-lime-50"
        disabled
      >
      </button>
    `;

    const button = this.querySelector("button");
    button.id = id;
    button.innerHTML = ICON[id];
    button.addEventListener("click", this._clickEvent);
  }
}

customElements.define("page-button", PaginateButton);

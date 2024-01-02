import "../../assets/no-image.png";

export class PokeCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  // eslint-disable-next-line no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  static get observedAttributes() {
    return ["name", "image", "href"];
  }

  render() {
    this.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-secondary hover:text-primary mt-8 rounded-lg border p-3 transition hover:shadow-xl",
    );

    this.innerHTML = `
      <a class="">
        <img class="w-full" style="margin-top: -35%" onerror="this.onerror=null;this.src='./assets/no-image.png';this.setAttribute('class', 'p-4')">
        <h2 class="text-center text-xl font-bold md:text-2xl"></h2>
      </a>
    `;

    this.querySelector("a").href = this.getAttribute("href");
    this.querySelector("h2").textContent = this.getAttribute("name");

    const imageUrl = this.getAttribute("image");
    const image = this.querySelector("img");

    image.src = imageUrl;
    image.alt = `image of ${name}`;
  }
}

customElements.define("poke-card", PokeCard);

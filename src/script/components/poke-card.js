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
    this.innerHTML = `
      <a class="">
        <img class="w-full" style="margin-top: -35%">
        <h2 class="text-center text-xl font-bold md:text-2xl"></h2>
      </a>
    `;

    const imageUrl = this.getAttribute("image");
    const name = this.getAttribute("name");
    const href = this.getAttribute("href");

    const anchor = this.querySelector("a");
    const image = this.querySelector("img");
    const heading = this.querySelector("h2");

    this.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-secondary hover:text-primary mt-8 rounded-lg border p-3 transition hover:shadow-xl",
    );

    anchor.href = href;
    image.src = imageUrl;
    image.alt = `image of ${name}`;
    heading.textContent = name;
  }
}

customElements.define("poke-card", PokeCard);

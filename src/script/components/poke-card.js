import "../../assets/no-image.png";

export class PokeCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute(
      "class",
      "hover:bg-ph-dark-blue border-ph-dark-blue text-secondary hover:text-primary mt-8 rounded-lg border p-3 transition hover:shadow-xl",
    );

    this.innerHTML = `
      <a>
        <img class="w-full" style="margin-top: -35%" onerror="this.onerror=null;this.src='./assets/no-image.png';this.setAttribute('class', 'p-4')">
        <h2 class="text-center text-xl font-bold md:text-2xl"></h2>
      </a>
    `;

    this.querySelector("a").href = this.getAttribute("href");
    this.querySelector("h2").textContent = this.getAttribute("name");

    const id = this.getAttribute("id");
    const imageUrl =
      this.getAttribute("image") ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const image = this.querySelector("img");

    image.src = imageUrl;
    image.alt = `image of ${name}`;
  }
}

customElements.define("poke-card", PokeCard);

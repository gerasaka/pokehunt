export class NotFoundModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  showModal() {
    this.querySelector("dialog").showModal();
  }

  close() {
    this.querySelector("dialog").close();
  }

  render() {
    this.innerHTML = `
      <dialog id="not-found-modal" class="modal">
        <div class="modal-box bg-gradient-to-t from-primary">
          <div class="my-4 flex justify-center gap-2">
            <p class="text-6xl font-bold">4</p>
            <img src="./assets/pokeball-logo.png" alt="logo pokeball" class="h-16 w-16" />
            <p class="text-6xl font-bold">4</p>
          </div>
          <h3 class="text-center text-lg font-bold text-secondary">Uh oh.. Pokémon not found</h3>
          <p class="py-4 text-center">Check the spelling or try another name or id</p>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    `;
  }
}

customElements.define("not-found-modal", NotFoundModal);

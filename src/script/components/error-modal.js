export class ErrorModal extends HTMLElement {
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
      <dialog class="modal">
        <div class="from-ph-dark-blue modal-box bg-gradient-to-t to-secondary">
          <div class="my-4 flex justify-center gap-2">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
              alt="logo pokeball"
              class="h-32 w-32"
            />
          </div>
          <h3 class="text-center text-lg font-bold text-primary">Oops.. something went wrong</h3>
          <p class="py-4 text-center text-white">Please try again later</p>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    `;
  }
}

customElements.define("error-modal", ErrorModal);

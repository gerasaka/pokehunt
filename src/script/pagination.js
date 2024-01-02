import { errorModal, loadPokemonList, renderLoadingState } from "./main";

export class PaginationService {
  _pokemonService = null;

  currIndicator = document.getElementById("curr-page");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  firstBtn = document.getElementById("first-btn");
  lastBtn = document.getElementById("last-btn");

  constructor(pokemonService) {
    this._pokemonService = pokemonService;
  }

  get sessionPageNumber() {
    return JSON.parse(sessionStorage.getItem("pokeSession")).activePage;
  }

  setPagination() {
    const { _pokemonService: pokemonService, firstBtn, lastBtn, nextBtn, prevBtn } = this;

    if (pokemonService.currentPage === 1) firstBtn.disabled = true;
    else firstBtn.disabled = false;

    if (pokemonService.currentPage === pokemonService.lastPageNumber) lastBtn.disabled = true;
    else lastBtn.disabled = false;

    if (pokemonService.previous) prevBtn.disabled = false;
    else prevBtn.disabled = true;

    if (pokemonService.next) nextBtn.disabled = false;
    else nextBtn.disabled = true;

    this.currIndicator.innerHTML = `Page ${pokemonService.currentPage}`;
  }

  handlePageChange(endpoint, setPageNumber, revertPageNumber) {
    renderLoadingState();
    setPageNumber();

    this._pokemonService
      .generatePokemonList(endpoint)
      .then(() => loadPokemonList())
      .catch(() => {
        revertPageNumber();
        errorModal.showModal();
      });
  }

  initiatePagination() {
    const { _pokemonService: pokemonService, firstBtn, lastBtn, nextBtn, prevBtn } = this;

    prevBtn.addEventListener("click", () =>
      this.handlePageChange(
        pokemonService.previous,
        () => (pokemonService.currentPage -= 1),
        () => (pokemonService.currentPage += 1),
      ),
    );

    nextBtn.addEventListener("click", () =>
      this.handlePageChange(
        pokemonService.next,
        () => (pokemonService.currentPage += 1),
        () => (pokemonService.currentPage -= 1),
      ),
    );

    firstBtn.addEventListener("click", () =>
      this.handlePageChange(
        `https://pokeapi.co/api/v2/pokemon`,
        () => (pokemonService.currentPage = 1),
        () => (pokemonService.currentPage = this.sessionPageNumber),
      ),
    );

    lastBtn.addEventListener("click", () =>
      this.handlePageChange(
        pokemonService.last,
        () => (pokemonService.currentPage = pokemonService.lastPageNumber),
        () => (pokemonService.currentPage = this.sessionPageNumber),
      ),
    );
  }
}

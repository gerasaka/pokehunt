export class InfoCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute(
      "class",
      "border-ph-dark-blue mx-auto flex max-w-sm gap-3 rounded-xl border p-4",
    );

    const height = this.getAttribute("height");
    const weight = this.getAttribute("weight");

    const heightInFt = ((height / 10) * 3.281).toFixed(1);
    const weightInLbs = Math.floor((weight / 10) * 2.205);

    this.innerHTML = `
      <span class="flex-1">
        <p>Height</p>
        <p class="inline text-lg font-bold">${height / 10} m</p>
        <p class="inline text-sm text-gray-500">( ${heightInFt} ft )</p>
      </span>
      <span class="bg-ph-dark-blue h-10 w-px self-center"></span>
      <span class="flex-1 text-right">
        <p class="text-right">Weight</p>
        <p class="inline text-lg font-bold">${weight / 10} kg</p>
        <p class="inline text-sm text-gray-500">( ${weightInLbs} lbs )</p>
      </span>
    `;
  }
}

customElements.define("basic-info-card", InfoCard);

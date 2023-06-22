export default class View {
  $ = {};

  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newrBtn = this.#qs('[data-id="newr-btn"]');

    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    // UI only

    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  /**
   * Register all event listeners
   *
   */
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newrBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", handler);
    });
  }

  /**
   * DOM helper methods
   */
  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player === 1 ? "fa-x" : "fa-o");
    icon.classList.add(player === 1 ? "yellow" : "turquoise");

    squareEl.replaceChildren(icon);
  }

  setTurn(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    this.$.turn.classList.add(player === 1 ? "yellow" : "turquoise");
    this.$.turn.classList.remove(player === 1 ? "turquoise" : "yellow");

    // icon.classList.add(player === 1 ? "fa-solid" : "fa-solid");
    icon.classList.add("fa-solid", player === 1 ? "fa-x" : "fa-o");

    label.innerText =
      player === 1 ? "Player 1 you are up!" : "Player 2 you are up!";

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could not find elements");

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements");

    return elList;
  }
}

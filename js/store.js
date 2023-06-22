import View from "./view";

export default class Store {
  $state = { moves: [] };

  constructor() {}

  #getState() {
    return this.#state;
  }

  #saveState() {
    const prevState = this.#getState;

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;

      default:
        throw new Error("invalid arg passed to saveState");
    }
    this.#state = newState;
  }
}

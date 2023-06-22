const initialValue = {
  moves: [],
};
export default class Store {
  #state = initialValue;

  constructor(player) {
    this.player = player;
  }

  get game() {
    const state = this.#getState();

    const currentPlayer = this.player[state.moves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    for (const player of this.player) {
      const selectedSquareIds = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isCompleted: winner != null || state.moves.length === 9,
        winner,
      },
    };
  }

  playerMove(squareId) {
    const state = this.#getState();

    const stateClone = structuredClone(state);

    stateClone.moves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#saveState(stateClone);
  }

  reset() {
    this.#saveState(initialValue);
  }

  #getState() {
    return this.#state;
  }

  #saveState(stateOrFn) {
    const prevState = this.#getState();

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

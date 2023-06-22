// const menu = document.querySelector(".menu");

// const menuItems = menu.querySelector(".items");

// menu.addEventListener("click", (event) => {
//   menuItems.classList.toggle("hidden");
// });

// import Store from "./store.js";
import Store from "./store.js";
import View from "./view.js";

const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newrBtn: document.querySelector('[data-id="newr-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    modalText: document.querySelector('[data-id="modal-text"]'),
    modalBtn: document.querySelector('[data-id="modal-btn"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);
    // console.log(p1moves);

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

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1moves.includes(v));
      const p2Wins = pattern.every((v) => p2moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });
    return {
      status:
        moves.length === 9 || winner !== null ? "complete" : "in=progress",

      winner,
    };
  },

  init: () => {
    App.registerEventListener();
  },

  registerEventListener() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("reset");
    });

    App.$.newrBtn.addEventListener("click", (event) => {
      console.log("new round");
      App.state.moves = [];
      App.$.squares.forEach((square) => {
        square.replaceChildren();
      });
    });

    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => {
        square.replaceChildren();
      });
      App.$.modal.classList.toggle("hidden");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        const lastMove = App.state.moves.at(-1);

        const getOppPlayer = (playerId) => (playerId === 1 ? 2 : 1);

        const currentPlayer =
          App.state.moves.length === 0 ? 1 : getOppPlayer(lastMove.playerId);

        const nextPlayer = getOppPlayer(currentPlayer);

        const icon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnLabel = document.createElement("p");

        turnLabel.innerText = `Player ${nextPlayer} you are up `;

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "fa-xl", "yellow");
          turnIcon.classList.add("fa-solid", "fa-o", "fa-xl", "turquoise");
          turnLabel.classList = "turquoise";
        } else if (currentPlayer === 2) {
          icon.classList.add("fa-solid", "fa-o", "fa-xl", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-x", "fa-xl", "yellow");
          turnLabel.classList = "yellow";
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);
        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        // console.log(App.state);

        square.replaceChildren(icon);

        const game = App.getGameStatus(App.state.moves);

        if (game.status === "complete") {
          App.$.modal.classList.toggle("hidden");
          let message = "";
          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = `Its a tie!`;
          }

          App.$.modalText.textContent = message;
        }

        // <i class="fa-solid fa-x fa-xl turquoise"></i>
        // <i class="fa-solid fa-x fa-xl turquoise"></i>
      });
    });
  },
};
// window.addEventListener("load", App.init);

// window.addEventListener("load", () => App.init());

function init() {
  const view = new View();
  const store = new Store();

  view.bindGameResetEvent((event) => {
    console.log("reset");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("new round");
    console.log(event);
  });

  view.bindPlayerMoveEvent((event) => {
    view.setTurn(2);
    view.handlePlayerMove(event.target, 1);
    console.log("player moves");
  });

  // console.log(view.$.turn);
}

window.addEventListener("load", init);

// const menu = document.querySelector(".menu");

// const menuItems = menu.querySelector(".items");

// menu.addEventListener("click", (event) => {
//   menuItems.classList.toggle("hidden");
// });

const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newrBtn: document.querySelector('[data-id="newr-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    currentPlayer: 1,
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
      App.$.squares.forEach((square1) => {
        // icon = document.getElementsByTagName('i')
        document.removeChild(square1);
      });
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(square.id);
        const icon = document.createElement("i");

        if (square.hasChildNodes()) {
          return;
        }
        const currentPlayer = App.state.currentPlayer;

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "fa-xl", "turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "fa-xl", "yellow");
        }

        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;

        square.replaceChildren(icon);
        // <i class="fa-solid fa-x fa-xl turquoise"></i>
        // <i class="fa-solid fa-x fa-xl turquoise"></i>

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
      });
    });
  },
};
window.addEventListener("load", App.init);

// window.addEventListener("load", () => App.init());

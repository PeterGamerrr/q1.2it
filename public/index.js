//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize;
let bombs;
let menuDifficulty = 0;
class cell {
    constructor(x, y, bomb) {
        this.claimedBy = 0;
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }
    move(player, x, y) {
    }
    explode(x, y) {
        //TODO: make explosion
    }
}
//menu
//players
function setMenuPlayerCount(num) {
    playerCount = num;
    console.log(num);
}
//size
function setMenuBoardSize(num) {
    menuBoardSize = num;
    console.log(num);
}
//difficulty
function setDifficulty(num) {
    menuDifficulty = num;
    console.log(num);
}
//board init
function startGame() {
    boardSize = playerCount + menuBoardSize + 3;
    bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);
    console.log("startup: " + bombs + " " + boardSize);
    $("main").empty();
    console.log("start");
    $("main").load("gameboard.html", () => {
        let gameBoard = $(".gameboard");
        console.log(gameBoard);
        root.style.setProperty("--boardsize", boardSize + "");
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let column = document.createElement("div");
                column.classList.add("cell");
                gameBoard.append(column);
            }
        }
    });
}
//game
//board

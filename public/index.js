//menu + init
let boardSize, bombs;
//players
let playerCount = 2;
function setMenuPlayerCount(num) {
    playerCount = num;
    console.log(num);
}
//size
let menuBoardSize = 0;
function setMenuBoardSize(num) {
    menuBoardSize = num;
    console.log(num);
}
//difficulty
// 0: easy
// 1: hard
// 2: insane
let menuDifficulty = 0;
function setDifficulty(num) {
    menuDifficulty = num;
    console.log(num);
}
//actual numbers
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
        let root = document.documentElement;
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
//board game cell
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

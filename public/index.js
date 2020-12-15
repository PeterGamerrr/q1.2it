//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize;
let bombs;
let menuDifficulty = 0;
let board;
let playerTurn = 1;
class cell {
    constructor(x, y) {
        this._bomb = false;
        this._claimedBy = 0;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set bomb(value) {
        this._bomb;
    }
    get bomb() {
        return this._bomb;
    }
    move(x, y) {
        if (this._claimedBy === 0) {
        }
    }
    explode(x, y) {
        //TODO: make explosion
    }
    get element() {
        console.log(".fieldcolumn-" + this._y + " .fieldrow-" + this._x);
        return $(".fieldcolumn-" + this._y + ".fieldrow-" + this._x);
    }
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
        board = [];
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = new cell(i, j);
                let column = document.createElement("div");
                column.classList.add("cell");
                column.classList.add("fieldcolumn-" + j);
                column.classList.add("fieldrow-" + i);
                gameBoard.append(column);
            }
        }
        console.log(board[8][8].x);
    });
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

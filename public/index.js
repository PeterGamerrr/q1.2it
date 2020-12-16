console.log("v0.3.26");
//board game cell
var root = document.documentElement;
var playerCount = 2;
var menuBoardSize = 0;
var boardSize;
var bombs;
var menuDifficulty = 0;
var board;
var playerTurn = 1;
var scores = [0, 0, 0, 0];
var Cell = /** @class */ (function () {
    function Cell(x, y, claimable) {
        this._bomb = false;
        this._claimable = true;
        this._x = x;
        this._y = y;
        if (claimable != undefined) {
            this._claimable = claimable;
        }
    }
    Object.defineProperty(Cell.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bomb", {
        get: function () {
            return this._bomb;
        },
        set: function (value) {
            this._bomb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "claimedBy", {
        get: function () {
            return parseInt(this.element.attr("c"));
        },
        set: function (value) {
            this.element.attr("c", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "claimable", {
        get: function () {
            return this._claimable;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.move = function () {
        // console.log({ //log: required conditions for moving
        //     "x-1":getBoard(this.x-1, this.y)  .element,
        //     "y-1":getBoard(this.x,   this.y-1).element,
        //     "x+1":getBoard(this.x+1, this.y)  .element,
        //     "y+1":getBoard(this.x,   this.y+1).element,
        //     "claimable": this.claimable,
        //     "claimedBy": this.claimedBy
        // })
        if (this.claimedBy === 0 &&
            this.claimable === true &&
            (getBoard(this.x - 1, this.y).claimedBy === playerTurn ||
                getBoard(this.x, this.y - 1).claimedBy === playerTurn ||
                getBoard(this.x + 1, this.y).claimedBy === playerTurn ||
                getBoard(this.x, this.y + 1).claimedBy === playerTurn)) {
            this.claim();
            nextTurn();
        }
    };
    Cell.prototype.claim = function (player) {
        if (player == undefined) {
            this.claimedBy = playerTurn;
            this.element.attr("c", playerTurn);
        }
        else {
            this.claimedBy = player;
            this.element.attr("c", player);
        }
    };
    Cell.prototype.explode = function (x, y) {
        //TODO: make explosion
    };
    Object.defineProperty(Cell.prototype, "element", {
        get: function () {
            return $(".cell[x='" + this.x + "'][y='" + this.y + "']");
        },
        enumerable: false,
        configurable: true
    });
    return Cell;
}());
//board init
function startGame() {
    boardSize = playerCount + menuBoardSize + 3;
    bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);
    // console.log("startup: " + bombs + " " + boardSize)
    $("main").empty();
    $("main").load("gameboard.html", function () {
        var gameBoard = $(".gameboard");
        root.style.setProperty("--boardsize", boardSize + "");
        board = [];
        for (var i = 0; i < boardSize; i++) {
            board[i] = [];
            for (var j = 0; j < boardSize; j++) {
                board[i][j] = new Cell(i, j);
                var cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("x", i + "");
                cell.setAttribute("y", j + "");
                cell.setAttribute("c", 0 + "");
                gameBoard.append(cell);
                $(".cell[x='" + i + "'][y='" + j + "']").on("click", function (e) {
                    var x = parseInt(e.target.getAttribute("x"));
                    var y = parseInt(e.target.getAttribute("y"));
                    // console.log(getBoard(x,y).element); //log: clicked target
                    getBoard(x, y).move();
                });
            }
        }
        setupStartPositions();
    });
}
function getBoard(x, y) {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        return board[x][y];
    }
    else {
        return new Cell(-1, -1, false);
    }
}
function setupStartPositions() {
    getBoard(0, 0).claim(1);
    getBoard(0, boardSize - 1).claim(2);
    getBoard(boardSize - 1, 0).claim(3);
    getBoard(boardSize - 1, boardSize - 1).claim(4);
}
function nextTurn() {
    // console.log("old next turn: " + playerTurn) //log: turn before update
    playerTurn++;
    if (playerTurn > playerCount) {
        playerTurn = 1;
    }
    // console.log("new next turn: " + playerTurn) //log: turn after update
    updateContent();
}
function updateContent() {
    //TODO: update content
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

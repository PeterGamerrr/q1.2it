console.log("v0.4.32");
//board game cell
var root = document.documentElement;
var playerCount = 2;
var menuBoardSize = 0;
var boardSize;
var bombs;
var bombsExploded;
var menuDifficulty = 0;
var board;
var playerTurn = 1;
var scores = [1, 1, 1, 1];
var Player = /** @class */ (function () {
    function Player(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Player.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.move = function (x, y, force) {
        if ((getBoard(x, y).claimedBy === 0 && ((x === this.x && y === this.y - 1) ||
            (x === this.x && y === this.y + 1) ||
            (x === this.x - 1 && y === this.y) ||
            (x === this.x + 1 && y === this.y))) || force === true) {
            getBoard(x, y).claim();
            this.x = x;
            this.y = y;
            movePlayerIcon(x, y, playerTurn);
            scores[playerTurn - 1]++;
            nextTurn();
        }
        else if (getBoard(x, y).claimedBy === playerTurn) {
            this.x = x;
            this.y = y;
            movePlayerIcon(x, y, playerTurn);
            nextTurn();
        }
    };
    return Player;
}());
var players = [new Player(0, 0), undefined, undefined, undefined];
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
    /**
     * @deprecated since version 4.10
     */
    Cell.prototype.move = function (player) {
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
    /**
      * @deprecated since version 4.10
      */
    Cell.prototype.canMoveHere = function (player) {
        return (this.claimedBy === 0 &&
            this.claimable === true &&
            (getBoard(this.x - 1, this.y).claimedBy === playerTurn ||
                getBoard(this.x, this.y - 1).claimedBy === playerTurn ||
                getBoard(this.x + 1, this.y).claimedBy === playerTurn ||
                getBoard(this.x, this.y + 1).claimedBy === playerTurn));
    };
    Cell.prototype.claim = function (player) {
        if (this.bomb === true) {
            this.explode();
        }
        if (player == undefined) {
            this.claimedBy = playerTurn;
            this.element.attr("c", playerTurn);
        }
        else {
            this.claimedBy = player;
            this.element.attr("c", player);
        }
    };
    Cell.prototype.explode = function () {
        //TODO: make explosion
        console.log("BOOM");
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
var player1Img = $("<img class='playerIcon' id='player1Img'/>");
player1Img.attr("src", "./playericons/speler1.png");
var player2Img = $("<img class='playerIcon' id='player2Img'/>");
player2Img.attr("src", "./playericons/speler2.png");
var player3Img = $("<img class='playerIcon' id='player3Img'/>");
player3Img.attr("src", "./playericons/speler3.png");
var player4Img = $("<img class='playerIcon' id='player4Img'/>");
player4Img.attr("src", "./playericons/speler4.png");
//board init
function startGame() {
    boardSize = playerCount + menuBoardSize + 3;
    bombs = Math.floor(boardSize * boardSize * (menuDifficulty * 0.05 + 0.1));
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
                    getCurrentPlayer().move(x, y);
                });
            }
        }
        setupStartPositions();
        generateBombs();
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
function getCurrentPlayer() {
    return players[playerTurn - 1];
}
function setupStartPositions() {
    //player1
    getBoard(0, 0).claim(1);
    // getBoard(0, 0).element.addClass("player1");
    getBoard(0, 0).element.append(player1Img);
    //player2
    if (playerCount === 2) {
        getBoard(boardSize - 1, boardSize - 1).claim(2);
        // getBoard(0, boardSize - 1).element.addClass("player2")
        getBoard(boardSize - 1, boardSize - 1).element.append(player2Img);
        players[1] = new Player(boardSize - 1, boardSize - 1);
    }
    else {
        getBoard(0, boardSize - 1).claim(2);
        // getBoard(0, boardSize - 1).element.addClass("player2")
        getBoard(0, boardSize - 1).element.append(player2Img);
        players[1] = new Player(0, boardSize - 1);
    }
    //player3
    if (playerCount >= 3) {
        getBoard(boardSize - 1, 0).claim(3);
        players[2] = new Player(boardSize - 1, 0);
        // getBoard(boardSize - 1, 0).element.addClass("player3")
        getBoard(boardSize - 1, 0).element.append(player3Img);
    }
    //player4
    if (playerCount >= 4) {
        getBoard(boardSize - 1, boardSize - 1).claim(4);
        players[3] = new Player(boardSize - 1, boardSize - 1);
        // getBoard(boardSize - 1, 0).element.addClass("player4")
        getBoard(boardSize - 1, boardSize - 1).element.append(player4Img);
    }
}
function generateBombs() {
    var maxtries = 500;
    console.log("genBombs");
    var bomb = bombs;
    while (bomb > 0 && maxtries > 0) {
        var x = Math.floor(Math.random() * boardSize);
        var y = Math.floor(Math.random() * boardSize);
        if (canbomb(x, y)) {
            getBoard(x, y)._bomb = true;
            console.log("bomb created " + bomb + "/" + bombs + " x: " + x + " y: " + y);
            bomb--;
        }
        else {
            console.log("bombs " + bomb + "/" + bombs + "  maxTries " + maxtries);
        }
        maxtries--;
    }
}
function canbomb(x, y) {
    switch (playerCount) {
        case 2:
            return !((players[0].x - x <= 1 && players[0].x - x >= -1 &&
                players[0].y - y <= 1 && players[0].y - y >= -1) ||
                (players[1].x - x <= 1 && players[1].x - x >= -1 &&
                    players[1].y - y <= 1 && players[1].y - y >= -1));
        case 3:
            return !((players[0].x - x <= 1 && players[0].x - x >= -1 &&
                players[0].y - y <= 1 && players[0].y - y >= -1) ||
                (players[1].x - x <= 1 && players[1].x - x >= -1 &&
                    players[1].y - y <= 1 && players[1].y - y >= -1) ||
                (players[2].x - x <= 1 && players[2].x - x >= -1 &&
                    players[2].y - y <= 1 && players[2].y - y >= -1));
        case 4:
            return !((players[0].x - x <= 1 && players[0].x - x >= -1 &&
                players[0].y - y <= 1 && players[0].y - y >= -1) ||
                (players[1].x - x <= 1 && players[1].x - x >= -1 &&
                    players[1].y - y <= 1 && players[1].y - y >= -1) ||
                (players[2].x - x <= 1 && players[2].x - x >= -1 &&
                    players[2].y - y <= 1 && players[2].y - y >= -1) ||
                (players[3].x - x <= 1 && players[3].x - x >= -1 &&
                    players[3].y - y <= 1 && players[3].y - y >= -1));
        default:
            return false;
            break;
    }
}
function movePlayerIcon(x, y, player) {
    switch (player) {
        case 1:
            getBoard(x, y).element.append(player1Img);
            break;
        case 2:
            getBoard(x, y).element.append(player2Img);
            break;
        case 3:
            getBoard(x, y).element.append(player3Img);
            break;
        case 4:
            getBoard(x, y).element.append(player4Img);
            break;
        default:
            break;
    }
}
function nextTurn() {
    // console.log("old next turn: " + playerTurn) //log: turn before update
    playerTurn++;
    if (playerTurn > playerCount) {
        playerTurn = 1;
    }
    // console.log("new next turn: " + playerTurn) //log: turn after update
    updateContent();
    console.log(playerTurn);
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

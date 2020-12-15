//menu + init
//players
let playerCount = 2;
function setMenuPlayerCount(num) {
    playerCount = num;
}
//size
let menuBoardSize = 0;
function setMenuBoardSize(num) {
    menuBoardSize = num;
}
//difficulty
// 0: easy
// 1: hard
// 2: insane
let menuDifficulty = 0;
function setDifficulty(num) {
    menuDifficulty = num;
}
//actual numbers
let boardSize, bombs;
boardSize = 2 * playerCount + 3;
bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);
//board init
$('main').empty();
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

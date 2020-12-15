//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize:number
let bombs:number;
let menuDifficulty = 0;
let board:cell[][];
let playerTurn = 1

class cell{ 
    private _x: number;
    private _y: number;
    private _bomb = false;
    private _claimedBy = 0;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    
    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public set bomb(value: boolean) {
        this._bomb;
    }

    public get bomb(): boolean {
        return this._bomb;
    }

    public move(x: number , y: number):void {
        if (this._claimedBy === 0) {
            
        }
    }

    private explode(x: number, y: number) {
        //TODO: make explosion
    }
    
    public get element():JQuery {
        console.log(".fieldcolumn-" + this.y + " .fieldrow-" + this.x )
        return $(".fieldcolumn-" + this.y + ".fieldrow-" + this.x )
    }

}


//board init
function startGame():void {
    boardSize = playerCount + menuBoardSize + 3 ;
    bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);
    

    console.log("startup: " + bombs + " " + boardSize)
    $("main").empty();
    console.log("start");
    $("main").load("gameboard.html", () => {
        let gameBoard = $(".gameboard");
        console.log(gameBoard);
        root.style.setProperty("--boardsize",boardSize + "");

        board = [];
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = new cell(i,j)
                let column = document.createElement("div");
                column.classList.add("cell");
                column.classList.add("fieldcolumn-" + j);
                column.classList.add("fieldrow-" + i);

                gameBoard.append(column);
            }
        }

        console.log(board[8][8].x)
    });
}













//menu
//players
function setMenuPlayerCount(num:number):void {
    playerCount = num;
    console.log(num);
}

//size
function setMenuBoardSize(num:number):void {
    menuBoardSize = num;
    console.log(num);
}

//difficulty
function setDifficulty(num:number):void {
    menuDifficulty = num;
    console.log(num);
}





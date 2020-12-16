//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize:number
let bombs:number;
let menuDifficulty = 0;
let board:Cell[][];
let playerTurn = 1;

class Cell{ 
    private _x: number;
    private _y: number;
    private _bomb = false;
    private _claimedBy = 0;
    private _claimable = true;

    constructor(x: number, y: number, claimable?: boolean) {
        this._x = x;
        this._y = y;
        if (claimable != undefined){
            this._claimable = claimable;
        }
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

    public get claimedBy(): number {
        return this._claimedBy
    }

    public get claimable(): boolean {
        return this._claimable;
    }

    public move():void {
        if (
            this.claimedBy === 0        &&
            this.claimable === true     &&
            (
                getBoard(this.y-1,this.x).claimedBy === playerTurn    ||
                getBoard(this.y+1,this.x).claimedBy === playerTurn    ||
                getBoard(this.y,this.x-1).claimedBy === playerTurn    ||
                getBoard(this.y,this.x+1).claimedBy === playerTurn
            ) ) {
            
        }
    }

    private explode(x: number, y: number) {
        //TODO: make explosion
    }
    
    public get element():JQuery {
        return $(".cell[x='" + this.x +"'][y='" + this.y + "']")
    }

}


//board init
function startGame():void {
    boardSize = playerCount + menuBoardSize + 3 ;
    bombs = boardSize * boardSize * (menuDifficulty * 0.05 + 0.1);
    

    // console.log("startup: " + bombs + " " + boardSize)
    $("main").empty();
    $("main").load("gameboard.html", () => {
        let gameBoard = $(".gameboard");
        root.style.setProperty("--boardsize",boardSize + "");

        board = [];
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = new Cell(j,i);
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("x",j +"");
                cell.setAttribute("y",i +"");
                gameBoard.append(cell);
                $(".cell[x='" + i +"'][y='" + j + "']").on("click", e => {
                    let x = parseInt(<string>e.target.getAttribute("x"));
                    let y = parseInt(<string>e.target.getAttribute("y"));
                    console.log(board[y][x].element);
                    board[y][x].move();

                })
            }
        }
    });
}

function getBoard(x: number, y:number):Cell {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        return board[y][x]
    } else {
        return new Cell(-1,-1,false)
    }
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





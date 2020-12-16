console.log("v0.3.26");

//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize:number
let bombs:number;
let menuDifficulty = 0;
let board:Cell[][];
let playerTurn = 1;
let scores = [0,0,0,0];

class Cell{ 
    private _x: number;
    private _y: number;
    private _bomb = false;
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
        return parseInt(<string>this.element.attr("c"))
    }
    public set claimedBy(value: number) {
        this.element.attr("c",value);
    }

    public get claimable(): boolean {
        return this._claimable;
    }

    public move():void {
        // console.log({ //log: required conditions for moving
        //     "x-1":getBoard(this.x-1, this.y)  .element,
        //     "y-1":getBoard(this.x,   this.y-1).element,
        //     "x+1":getBoard(this.x+1, this.y)  .element,
        //     "y+1":getBoard(this.x,   this.y+1).element,
        //     "claimable": this.claimable,
        //     "claimedBy": this.claimedBy
        // })
        if (
            this.claimedBy === 0        &&
            this.claimable === true     &&
            (
                getBoard(this.x-1, this.y)  .claimedBy === playerTurn    ||
                getBoard(this.x,   this.y-1).claimedBy === playerTurn    ||
                getBoard(this.x+1, this.y)  .claimedBy === playerTurn    ||
                getBoard(this.x,   this.y+1).claimedBy === playerTurn    
            ) ) {

            this.claim();
            nextTurn();
        } 
    }

    public claim(player?: number):void {
        if (player == undefined) {
            this.claimedBy = playerTurn;
            this.element.attr("c", playerTurn)
        } else {
            this.claimedBy = player;
            this.element.attr("c", player)
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
                board[i][j] = new Cell(i,j);
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("x",i + "");
                cell.setAttribute("y",j + "");
                cell.setAttribute("c",0 + "");
                gameBoard.append(cell);
                $(".cell[x='" + i +"'][y='" + j + "']").on("click", e => {
                    let x = parseInt(<string>e.target.getAttribute("x"));
                    let y = parseInt(<string>e.target.getAttribute("y"));
                    // console.log(getBoard(x,y).element); //log: clicked target
                    getBoard(x,y).move();

                })
            }
        }
        setupStartPositions();
    });
}

function getBoard(x: number, y:number):Cell {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        return board[x][y];
    } else {
        return new Cell(-1,-1,false);
    }
}

function setupStartPositions(): void {
    getBoard(0,0).claim(1);
    getBoard(0,boardSize-1).claim(2);
    getBoard(boardSize-1,0).claim(3);
    getBoard(boardSize-1,boardSize-1).claim(4);
}

function nextTurn():void {
    // console.log("old next turn: " + playerTurn) //log: turn before update
    playerTurn++;
    if (playerTurn > playerCount) {
        playerTurn = 1;
    } 
    // console.log("new next turn: " + playerTurn) //log: turn after update
    updateContent();
}

function updateContent():void {
    //TODO: update content
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





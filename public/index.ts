//board game cell
class cell{ 
    private x: number;
    private y: number;
    private bomb: boolean;
    private claimedBy = 0;

    constructor(x: number, y: number, bomb: boolean) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }

    
    public get getX(): number {
        return this.x;
    }

    public get getY(): number {
        return this.y;
    }

    public move(player: number, x: number , y: number):void {
        
    }

    private explode(x: number, y: number) {
        //TODO: make explosion
    }
    
}

//menu + init
let boardSize:number, bombs:number;

//players
let playerCount = 2;
function setMenuPlayerCount(num:number):void {
    playerCount = num;
    console.log(num);
}

//size
let menuBoardSize = 0;
function setMenuBoardSize(num:number):void {
    menuBoardSize = num;
    console.log(num);
}

//difficulty
// 0: easy
// 1: hard
// 2: insane
let menuDifficulty = 0;
function setDifficulty(num:number):void {
    menuDifficulty = num;
    console.log(num);
}


//actual numbers

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
        let root = document.documentElement;
        root.style.setProperty("--boardsize",boardSize + "");
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




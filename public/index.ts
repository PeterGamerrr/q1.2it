console.log("v0.5.6");

//board game cell
let root = document.documentElement;
let playerCount = 2;
let menuBoardSize = 0;
let boardSize: number;
let bombs: number;
let bombsExploded: number;
let menuDifficulty = 0;
let board: Cell[][];
let playerTurn = 1;
let scores = [1, 1, 1, 1];
let availableCells: number;

class Player {
  private _x: number;
  private _y: number;
  private _homeX: number;
  private _homeY: number;

  constructor(x: number, y:number) {
    this._x = x;
    this._y = y;
    this._homeX = x;
    this._homeY = y;
  }
 
  public get x() : number {
    return this._x;
  }

  public get y() : number {
    return this._y;
  }  

  public set x(x : number) {
    this._x = x;
  }
  
  public set y(y : number) {
    this._y = y;
  }

  public get homeX() : number {
    return this._homeX;
  }
  
  public get homeY() : number {
    return this._homeY;
  }

  public move(x:number, y:number, force?: boolean): void {
    if ((
      getBoard(x,y).claimedBy === 0 && (
        (x === this.x && y === this.y-1) || 
        (x === this.x && y === this.y+1) || 
        (x === this.x-1 && y === this.y) || 
        (x === this.x+1 && y === this.y)
      )) || force === true
    ){
      this.x = x;
      this.y = y;
      movePlayerIcon(x,y,playerTurn);
      scores[playerTurn-1]++;
      nextTurn();
      getBoard(x,y).claim();
    } 
    else if (getBoard(x,y).claimedBy === playerTurn) {
      this.x = x;
      this.y = y;
      movePlayerIcon(x,y,playerTurn);
      nextTurn();
    }
    
  }

  public resetLocation(player: number) {
    this.x = this.homeX;
    this.y = this.homeY;
    switch (player) {
      case 1:
        movePlayerIcon(this.homeX,this.homeY,1);
        break;
      case 2:
        movePlayerIcon(this.homeX,this.homeY,2);
        break;
      case 3:
        movePlayerIcon(this.homeX,this.homeY,3);
        break;
      case 4:
        movePlayerIcon(this.homeX,this.homeY,4);
        break;
                
      default:
        break;
    }
  }
  
}

let players= [new Player(0,0),undefined,undefined,undefined];

class Cell {
  private _x: number;
  private _y: number;
  public _bomb = false;
  private _claimable = true;

  constructor(x: number, y: number, claimable?: boolean) {
    this._x = x;
    this._y = y;
    if (claimable != undefined) {
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
    return parseInt(<string>this.element.attr("c"));
  }

  public set claimedBy(value: number) {
    this.element.attr("c", value);
  }

  public get claimable(): boolean {
    return this._claimable;
  }


  /**
   * @deprecated since version 4.10
   */  
  public move(player: number): void {
    // console.log({ //log: required conditions for moving
    //     "x-1":getBoard(this.x-1, this.y)  .element,
    //     "y-1":getBoard(this.x,   this.y-1).element,
    //     "x+1":getBoard(this.x+1, this.y)  .element,
    //     "y+1":getBoard(this.x,   this.y+1).element,
    //     "claimable": this.claimable,
    //     "claimedBy": this.claimedBy
    // })
    if (
      this.claimedBy === 0 &&
      this.claimable === true &&
      (getBoard(this.x - 1, this.y).claimedBy === playerTurn ||
        getBoard(this.x, this.y - 1).claimedBy === playerTurn ||
        getBoard(this.x + 1, this.y).claimedBy === playerTurn ||
        getBoard(this.x, this.y + 1).claimedBy === playerTurn)
    ) {
      this.claim();
      nextTurn();
    }

  }

 /**
   * @deprecated since version 4.10
   */  
  public canMoveHere(player: number): boolean {
    return (
      this.claimedBy === 0 &&
      this.claimable === true &&
      (getBoard(this.x - 1, this.y).claimedBy === playerTurn ||
        getBoard(this.x, this.y - 1).claimedBy === playerTurn ||
        getBoard(this.x + 1, this.y).claimedBy === playerTurn ||
        getBoard(this.x, this.y + 1).claimedBy === playerTurn)
    );
  }

  public claim(player?: number): void {
    if (this.bomb === true) {
      this.explode()
    } else if (player == undefined) {
      this.claimedBy = playerTurn;
      this.element.attr("c", playerTurn);
    } else {
      this.claimedBy = player;
      this.element.attr("c", player);
    }
  }

  private explode(): void {
    console.log("BOOM X: " + this.x + " Y: " + this.y);
    this.bomb = false;
    //claims
    this.resetCell();
    getBoard(this.x-1,this.y-1).resetCell();
    getBoard(this.x-1,this.y  ).resetCell();
    getBoard(this.x-1,this.y+1).resetCell();
    getBoard(this.x,  this.y-1).resetCell();
    getBoard(this.x,  this.y+1).resetCell();
    getBoard(this.x+1,this.y-1).resetCell();
    getBoard(this.x+1,this.y  ).resetCell();
    getBoard(this.x+1,this.y+1).resetCell();
    //players
    for (let i = 0; i < players.length; i++) {
      const p = <Player>players[i];
      if (p.x-this.x <= 1 && p.x-this.x >= -1 && p.y-this.y <= 1 && p.y-this.y >= -1) {
        p.resetLocation(i+1);
      }
    }

  }

  private resetCell(): void {
    if (this.claimedBy !== 0) {
      scores[this.claimedBy-1]--;
      availableCells++;
      this.claimedBy = 0;
    }

  }

  public get element(): JQuery {
    return $(".cell[x='" + this.x + "'][y='" + this.y + "']");
  }
}

let player1Img = $("<img class='playerIcon' id='player1Img'/>");
player1Img.attr("src", "./playericons/speler1.png");

let player2Img = $("<img class='playerIcon' id='player2Img'/>");
player2Img.attr("src", "./playericons/speler2.png");

let player3Img = $("<img class='playerIcon' id='player3Img'/>");
player3Img.attr("src", "./playericons/speler3.png");

let player4Img = $("<img class='playerIcon' id='player4Img'/>");
player4Img.attr("src", "./playericons/speler4.png");



//board init
function startGame(): void {
  boardSize = playerCount + menuBoardSize + 3;
  bombs = Math.floor(boardSize * boardSize * (menuDifficulty * 0.05 + 0.1));

  // console.log("startup: " + bombs + " " + boardSize)
  $("main").empty();
  $("main").load("gameboard.html", () => {
    let gameBoard = $(".gameboard");
    root.style.setProperty("--boardsize", boardSize + "");

    board = [];
    for (let i = 0; i < boardSize; i++) {
      board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        board[i][j] = new Cell(i, j);
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("x", i + "");
        cell.setAttribute("y", j + "");
        cell.setAttribute("c", 0 + "");
        gameBoard.append(cell);
        $(".cell[x='" + i + "'][y='" + j + "']").on("click", (e) => {
          let x = parseInt(<string>e.target.getAttribute("x"));
          let y = parseInt(<string>e.target.getAttribute("y"));
          // console.log(getBoard(x,y).element); //log: clicked target
          getCurrentPlayer().move(x, y);
        });
      }
    }
    setupStartPositions();
    generateBombs()
  });
}

function getBoard(x: number, y: number): Cell {
  if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
    return board[x][y];
  } else {
    return new Cell(-1, -1, false);
  }
}

function getCurrentPlayer(): Player{
  return <Player>players[playerTurn-1];
}

function setupStartPositions(): void {
  //player1
  getBoard(0, 0).claim(1);
  // getBoard(0, 0).element.addClass("player1");
  getBoard(0,0).element.append(player1Img);

  //player2
  if (playerCount === 2) {
    getBoard(boardSize - 1, boardSize - 1).claim(2);
    // getBoard(0, boardSize - 1).element.addClass("player2")
    getBoard(boardSize - 1,boardSize - 1).element.append(player2Img);
    players[1] = new Player(boardSize - 1,boardSize - 1);
  } else {
    getBoard(0, boardSize - 1).claim(2);
    // getBoard(0, boardSize - 1).element.addClass("player2")
    getBoard(0,boardSize - 1).element.append(player2Img);
    players[1] = new Player(0,boardSize - 1);
  }

  //player3
  if (playerCount >= 3) {
    getBoard(boardSize - 1, 0).claim(3);
    players[2] = new Player(boardSize - 1, 0);
    // getBoard(boardSize - 1, 0).element.addClass("player3")
    getBoard(boardSize - 1,0).element.append(player3Img);
  }

  //player4
  if (playerCount >= 4){
    getBoard(boardSize - 1, boardSize - 1).claim(4);
    players[3] = new Player(boardSize - 1, boardSize - 1);
    // getBoard(boardSize - 1, 0).element.addClass("player4")
    getBoard(boardSize - 1,boardSize - 1).element.append(player4Img);
  }
}

function generateBombs(): void {
  let maxtries = 500;
  console.log("genBombs");
  let bomb = bombs
  while (bomb > 0 && maxtries > 0) {
    let x = Math.floor(Math.random()*boardSize)
    let y = Math.floor(Math.random()*boardSize)
    if(canbomb(x,y)) {
      getBoard(x,y)._bomb = true;
      console.log("bomb created " + bomb + "/" + bombs + " x: " + x + " y: " + y)
      bomb--;
    } else {
      console.log("bombs " + bomb + "/" + bombs + "  maxTries " + maxtries);
    }
    maxtries--;
  }
}

function canbomb(x: number,y: number): boolean {
  switch (playerCount) {
    case 2:
      return !(
        (
          (<Player>players[0]).x-x <= 1 && (<Player>players[0]).x-x >= -1 &&
          (<Player>players[0]).y-y <= 1 && (<Player>players[0]).y-y >= -1 
        )|| 
        (
          (<Player>players[1]).x-x <= 1 && (<Player>players[1]).x-x >= -1 &&
          (<Player>players[1]).y-y <= 1 && (<Player>players[1]).y-y >= -1
        )
      );
      
    case 3: 
      return !(
        (
          (<Player>players[0]).x-x <= 1 && (<Player>players[0]).x-x >= -1 &&
          (<Player>players[0]).y-y <= 1 && (<Player>players[0]).y-y >= -1
        )||

        (
          (<Player>players[1]).x-x <= 1 && (<Player>players[1]).x-x >= -1 &&
          (<Player>players[1]).y-y <= 1 && (<Player>players[1]).y-y >= -1 
        )||

        (
          (<Player>players[2]).x-x <= 1 && (<Player>players[2]).x-x >= -1 &&
          (<Player>players[2]).y-y <= 1 && (<Player>players[2]).y-y >= -1 
        )
      );

    case 4: 
      return !( 
        (
          (<Player>players[0]).x-x <= 1 && (<Player>players[0]).x-x >= -1 &&
          (<Player>players[0]).y-y <= 1 && (<Player>players[0]).y-y >= -1 
        )||

        (
          (<Player>players[1]).x-x <= 1 && (<Player>players[1]).x-x >= -1 &&
          (<Player>players[1]).y-y <= 1 && (<Player>players[1]).y-y >= -1 
        )||

        (
          (<Player>players[2]).x-x <= 1 && (<Player>players[2]).x-x >= -1 &&
          (<Player>players[2]).y-y <= 1 && (<Player>players[2]).y-y >= -1 
        )||
        
        (
          (<Player>players[3]).x-x <= 1 && (<Player>players[3]).x-x >= -1 &&
          (<Player>players[3]).y-y <= 1 && (<Player>players[3]).y-y >= -1
        )
      );
       
    default:
      return false;
      break;
  }
}

function movePlayerIcon(x: number, y: number, player: number) : void {
  switch (player) {
    case 1:
      getBoard(x,y).element.append(player1Img);
      break;
    case 2:
      getBoard(x,y).element.append(player2Img);
      break;
    case 3:
      getBoard(x,y).element.append(player3Img);
      break;
    case 4:
      getBoard(x,y).element.append(player4Img);
      break;
      
    default:
      break;
  }
}

function nextTurn(): void {
  // console.log("old next turn: " + playerTurn) //log: turn before update
  playerTurn++;
  if (playerTurn > playerCount) {
    playerTurn = 1;
  }
  
  // console.log("new next turn: " + playerTurn) //log: turn after update
  updateContent();
  console.log(playerTurn);
}

function updateContent(): void {
  //TODO: update content
}


//menu
//players
function setMenuPlayerCount(num: number): void {
  playerCount = num;
  console.log(num);
}

//size
function setMenuBoardSize(num: number): void {
  menuBoardSize = num;
  console.log(num);
}

//difficulty
function setDifficulty(num: number): void {
  menuDifficulty = num;
  console.log(num);
}


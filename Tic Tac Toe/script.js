var board;
var player0 = "O";
var player1 = "X";
var currPlayer = player0;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != '') {
        return;
    }
    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    if (currPlayer == player0) {
        currPlayer = player1;
    } else {
        currPlayer = player0;
    }
    checkWinner();
}

function checkWinner() {
    // Horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != '') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    // Vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != '') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    // Diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
    // Anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '') {
        document.getElementById("0-2").classList.add("winner");
        document.getElementById("1-1").classList.add("winner");
        document.getElementById("2-0").classList.add("winner");
        gameOver = true;
        return;
    }
}
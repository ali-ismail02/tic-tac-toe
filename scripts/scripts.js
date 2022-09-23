const boxes = document.querySelectorAll(".box")
const main = document.getElementById('main')
const winnerH1 = document.getElementById("winner")
const playerX = document.getElementById("x")
const playerY = document.getElementById("y")
const reset = document.getElementById("reset")
const restart = document.getElementById("restart")

let player = "x"
let x = 0
let y = 0
let won =0

// functions

const clear = () => {
    for(let i of boxes) {
        if(i.classList.contains("x")) i.classList.remove("x")
        if(i.classList.contains("y")) i.classList.remove("y")
    }
}

const winner = (a,b,c,player) => {
    return boxes[a].classList.contains(player) && boxes[b].classList.contains(player) && boxes[c].classList.contains(player)
}

const gameFinished = () => {
    let res = ["x", "y"].filter((player) =>
        winner(0,1,2,player)  // check for 3-in-a-row horizontally
        ||  winner(3,4,5,player) 
        ||  winner(6,7,8,player) 
        ||  winner(0,3,6,player)  // check for 3-in-a-row vertically
        ||  winner(1,4,7,player) 
        ||  winner(2,5,8,player) 
        ||  winner(0,4,8,player)  // check for 3-in-a-row diagonally
        ||  winner(6,4,2,player)
    );
    if(res.length != 0) return res[0];
    for(let i of boxes)
    {
        if(!i.classList.contains("x") && !i.classList.contains("y")) return null;
    }
    return "draw";
}

const win = () => {
    let winnerChar = gameFinished();
    if(winnerChar != null) {
        if(winnerChar == "draw")
        {
            winnerH1.innerHTML = "Draw";
        }
        else
        {
            won = 1;
            if (winnerChar == "x") {
                x += 1
                playerX.innerHTML = `Red: ${x}`
                winnerH1.innerHTML = "Red WON!!!"
            }else {
                y += 1
                playerY.innerHTML = `Yellow: ${y}`
                winnerH1.innerHTML = "Yellow WON!!!"
            }
        }
        return true;
    }
    return false;
}


for(let i of boxes) {
    i.addEventListener("click", () => {
        if(!i.classList.contains("x") && !i.classList.contains("y") && !won){
            i.classList.add("x");
            if(win()) return;
            //After we may a move, let the AI take his turn
            let bestMove = findBestMove();
            if(bestMove != null) bestMove.classList.add("y");
            win();
        }
    })
}

restart.addEventListener("click", () => {
    winnerH1.innerHTML = ""
    clear()
    won=0
})

reset.addEventListener("click", () => {
    winnerH1.innerHTML = ""
    won = x = y = 0
    playerY.innerHTML = `Yellow: ${x}`
    playerX.innerHTML = `Red: ${x}`
    clear()
})

//AI :)
function minimax(depth, isMax)
{
    const winnerChar = gameFinished();
 
    if (winnerChar == "y")
        return 10;
 
    if (winnerChar == "x")
        return -10;
 
    if (winnerChar == "draw")
        return 0;
 
    if (isMax)
    {
        let best = -1000;
        for(let i of boxes)
        {
            if(!i.classList.contains("x") && !i.classList.contains("y"))
            {
                i.classList.add("y");
                best = Math.max(best, minimax(depth + 1, !isMax));
                i.classList.remove("y");
            }
        }
        return best;
    }
    let best = 1000;
    for(let i of boxes)
    {
        if(!i.classList.contains("x") && !i.classList.contains("y"))
        {
            i.classList.add("x");
            best = Math.min(best, minimax(depth + 1, !isMax));
            i.classList.remove("x");
        }
    }
    return best;
}

function findBestMove()
{
    let maxScore = -500;
    let bestMove = null;
    for(let i of boxes)
    {
        if(!i.classList.contains("x") && !i.classList.contains("y"))
        {
            i.classList.add("y");
            const score = minimax(0, false);
            i.classList.remove("y");

            if (score > maxScore)
            {
                bestMove = i;
                maxScore = score;
            }
        }
    }
    return bestMove;
}

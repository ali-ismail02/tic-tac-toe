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

const winner = (a,b,c,player) => {
    return boxes[a].classList.contains(player) && boxes[b].classList.contains(player) && boxes[c].classList.contains(player)
}

const win = (player) => {
    if(winner(0,1,2,player)  // check for 3-in-a-row horizontally
    ||  winner(3,4,5,player) 
    ||  winner(6,7,8,player) 
    ||  winner(0,3,6,player)  // check for 3-in-a-row vertically
    ||  winner(1,4,7,player) 
    ||  winner(2,5,8,player) 
    ||  winner(0,4,8,player)  // check for 3-in-a-row diagonally
    ||  winner(6,4,2,player)) {
        won = 1
        if (player == "x") {
            x += 1
            playerX.innerHTML = `Red: ${x}`
            winnerH1.innerHTML = "Red WON!!!"
        }else {
            y += 1
            playerY.innerHTML = `Yellow: ${y}`
            winnerH1.innerHTML = "Yellow WON!!!"
        }

    }
}

for(let i of boxes) {
    i.addEventListener("click", () => {
        if(!i.classList.contains("x") && !i.classList.contains("y") && !won){
            i.classList.add(player)
            win(player)
            if(player == "x"){
                player = "y"
            }else player = "x"
        }
    })
}
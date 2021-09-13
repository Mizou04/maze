import Character from "./components/character/character.js"
import {Size, Coordinates} from "./utils/helpers.js"
import Game from "./components/game/game.js"

let called = false;

function controller(){
    const timer = document.querySelector(".header__element--timer");
    const highScores = JSON.parse(window.localStorage.getItem("HIGH_SCORES")) || [];
    const btn = document.querySelector(".header__element--btn")
    const canvas = document.querySelector("canvas");
          canvas.width = canvas.clientWidth; 
          canvas.height = canvas.clientHeight; 
    const ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
    const game = new Game("pending", ctx);
          game.maze.draw(ctx);
    
    window.onresize = e => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.maze.draw(ctx);
    }

    btn.addEventListener("click", (e)=>{
        if(game.state == "pending"){
            game.pause();
            btn.innerHTML = "RESUME";
        } else
        if(game.state == "paused"){
            btn.innerHTML = "PAUSE";
            game.resume();
        }
    })
    // window.onblur = game.pause;
    // window.requestAnimationFrame(controller);
}

controller();
// requestAnimationFrame(controller);
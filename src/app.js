import Character from "./components/character/character.js"
import {Size, Coordinates} from "./utils/helpers.js"
import Game from "./components/game/game.js"
import { mazeMap } from "./components/maze/map.maze.js";


function controller(){
    const timer = document.querySelector(".header__element--timer");
    const highScores = JSON.parse(window.localStorage.getItem("HIGH_SCORES")) || [];
    const pauseResumeBtn = document.querySelector(".header__element--btn")
    const canvas = document.querySelector("canvas");
          canvas.width = canvas.clientWidth; 
          canvas.height = canvas.clientHeight; 
    const ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
    const game = new Game("pending", ctx);
          game.update(ctx)
          
    
    function update(e){
            if(e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            game.player.move(e.key, ctx);
            game.update(ctx);
        // game.goal.isAchieved = true;
        // game.goal.isAchieved && game.win();
    }
    
    window.addEventListener("keydown", update, false);
    
    window.onresize = e => {
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
          game.update(ctx);
    }

    pauseResumeBtn.addEventListener("click", (e)=>{
        if(game.state == "pending"){
            game.pause();
            pauseResumeBtn.innerHTML = "RESUME";
            window.removeEventListener("keydown", update, false)
        } else
        if(game.state == "paused"){
            game.resume();
            pauseResumeBtn.innerHTML = "PAUSE";
            window.addEventListener("keydown", update, false)
        }
    })
    // window.onblur = game.pause;
    // window.requestAnimationFrame(controller);
    
}
controller();


// requestAnimationFrame(controller);
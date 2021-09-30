import StartPage from "../views/beforeStart/beforeStart.js";
import HighscoresPage from "../views/highscores/highscore.js";
import MainPage from "../views/main/main.js";
import Game from "./components/game/game.js"
let container = document.querySelector(".canvasContainer");

function controller(){
    const timer = document.querySelector(".header__element--timer");
    const highScores = JSON.parse(window.localStorage.getItem("HIGH_SCORES")) || [];
    const pauseResumeBtn = document.querySelector(".header__element--btn");
    let canvas = document.createElement("canvas");
    // const canvas = document.querySelector("#canvas");
    canvas.id = "canvas";
    container.innerHTML = canvas.outerHTML;
    // canvas = canvas
    let game;
    
    canvas.width = container.clientWidth; 
    canvas.height = canvas.width; 
    const ctx = canvas.getContext("2d");
    game = new Game("pending", ctx);
        game.update(ctx);
        ctx.beginPath();
          
    console.log(canvas)
    let update = (e) =>{
            e.preventDefault();
            if(e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            game.win()
            game.player.move(e.key, ctx);
            window.removeEventListener("keydown", update, false);
            setTimeout(()=>{
                window.addEventListener("keydown", update, false)
            }, 0)
            game.update(ctx);
            if(game.win()){
                game.pause();
                highScores.push({name : prompt("your name?") || "Player", score : parseInt(1 / timer.innerHTML * 1000) })
                localStorage.setItem("HIGH_SCORES", JSON.stringify([...highScores].sort((a,b)=> - a.score + b.score)));
                
                window.removeEventListener("keydown", update, false);
                let newGame = confirm("play again?");
                if(newGame){
                    game = new Game("pending", ctx);
                    game.update(ctx);
                } else {
                    newGame = confirm("play again?")
                }
                
            }
    }
    
    window.addEventListener("keydown", update, false);    

    window.onresize = () => {
        canvas.width = canvas.clientWidth; 
        canvas.height = canvas.clientHeight; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    
}
// controller();


import viewInterface from "./interfaceComponent.js";

viewInterface.addStrategy(
    new MainPage("mainPage", "Main page"),
    new HighscoresPage("highscoresPage", "Highscores"),
    new StartPage("startPage", "Starting the Game"),
)

let pages = viewInterface;
// console.log(page.returnBtn.outerHTML)
container.innerHTML = pages.getStrategy("mainPage").outerHTML;

container.addEventListener("click", e=>{
    if(e.target.classList.contains("page__main--button-start")){
        container.innerHTML = pages.getStrategy("startPage").outerHTML
    };
    if(e.target.classList.contains("page__startpage--button")){
        // container.innerHTML = pages.getStrategy("startPage").outerHTML
    };
    if(e.target.classList.contains("page--button-back")){
        container.innerHTML = pages.getStrategy("mainPage").outerHTML
    };
    if(e.target.classList.contains("page__main--button-highscores")){
        container.innerHTML = pages.getStrategy("highscoresPage").outerHTML
    }
})
import Game from "./components/game/game.js"

function controller(){
    const timer = document.querySelector(".header__element--timer");
    const highScores = JSON.parse(window.localStorage.getItem("HIGH_SCORES")) || [];
    const pauseResumeBtn = document.querySelector(".header__element--btn")
    const canvas = document.querySelector("canvas");
          canvas.width = canvas.clientWidth; 
          canvas.height = canvas.width; 
    const ctx = canvas.getContext("2d");
          ctx.beginPath();
    let game = new Game("pending", ctx);
         game.update(ctx);
          
    
    let update = (e) =>{
            e.preventDefault();
            if(e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            game.player.move(e.key, ctx);
            
            window.removeEventListener("keydown", update, false);
            setTimeout(()=>{
                window.addEventListener("keydown", update, false)
            }, 0)
            game.update(ctx);
            if(game.win()){
                game.pause();
                highScores.push({name : prompt("your name?"), score : parseInt(1 / timer.innerHTML * 1000) })
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
controller();



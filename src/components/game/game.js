import Player from "../character/player.js"
import Goal from "../character/goal.js"
import Maze from "../maze/maze.js"
import {mazeMap} from "../maze/map.maze.js"
import { Coordinates, Size } from "../../utils/helpers.js";

export default class Game{
    constructor(state, ctx, level){
        this.state = state; //paused, ended, pending
        this.ctx = ctx;
        this.level = level;
        this.seconds = 0; // keep track of time
        this.timer = document.querySelector(".header__element--timer");
        this.startTime = window.setInterval(()=>{ 
            this.seconds++;
            this.timer.innerHTML = this.seconds;
        }, 1000);
        // § score will be based on the time in the game;
        this.score = this.seconds * 10 + " pts";
        // let size = parseInt(ctx.canvas.clienWidth) / 10;
        let size = 40;
        this.maze = new Maze(mazeMap, size / 4 , "black");
        let randomY = Math.floor(Math.random() * mazeMap.length);
        this.player = new Player(new Size(size, size), new Coordinates(Math.floor(size / 2), Math.floor(randomY * (ctx.canvas.clientHeight / mazeMap.length) + size) ));
        this.goal = new Goal(new Size(size, size), new Coordinates(Math.floor(size / 2) * 5, Math.floor(randomY * (ctx.canvas.clientHeight / mazeMap.length) + size) ))

        // if(typeof level !== "number"){
            //     throw Error("level is not a number")
            // };
            if(typeof state !== "string"){
                throw Error("state is not a string")
            };

    }

    update(ctx){
        let {canvas} = ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.maze.draw(ctx);
        this.player.draw(ctx);
        // this.goal.draw(ctx);
    }

    pause(){
        this.state === "pending" && (this.state = "paused");
        clearInterval(this.startTime);
    }

    resume(){
        this.state === "paused" && (this.state = "pending"); 
        this.startTime = setInterval(()=>{
            this.seconds++;
            this.timer.innerHTML = this.seconds;
        }, 1000);
    };
    
    win(){
        document.innerHTML = "congratulations"
    }
}
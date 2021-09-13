import Player from "../character/player.js"
import Goal from "../character/goal.js"
import Maze from "../maze/maze.js"
import {mazeMap} from "../maze/map.maze.js"

export default class Game{
    constructor(state, ctx, level){
        this.state = state; //paused, ended, pending
        this.ctx = ctx;
        this.level = level;
        this.seconds = 0; // keep track of time
        this.timer = document.querySelector(".header__element--timer");
        this.startTime = window.setInterval(()=>{ 
            this.updateTime();
            this.timer.innerHTML = this.seconds;
        }, 1000);
        // § score will be based on the time in the game;
        this.score = this.seconds * 10 + " pts";
        // § modes will be added in another version
        if(typeof state !== "string"){
            throw Error("state is not a string")
        };
        this.maze = new Maze(mazeMap, 15, "black")
        // if(typeof level !== "number"){
        //     throw Error("level is not a number")
        // };
    }


    updateTime(){
        this.seconds++;
    }

    pause(){
        this.state === "pending" && (this.state = "paused");
        clearInterval(this.startTime);
    }

    resume(){
        this.state === "paused" && (this.state = "pending"); 
        this.startTime = setInterval(()=>{
            this.updateTime();
            this.timer.innerHTML = this.seconds;
        }, 1000);
    };
    
}
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
        let size = Math.floor(ctx.canvas.width / 10);
        let randomY = Math.floor(Math.random() * (mazeMap.length - 1));
        let canvasWidth = ctx.canvas.width
        let widthScale = canvasWidth / mazeMap.length;

        this.player = new Player(new Size(size + 15, size - 10), new Coordinates(Math.floor(size / 2), Math.floor(randomY * (ctx.canvas.clientHeight / mazeMap.length)) + size / 2 ), "../../src/assets/player_minotaur.png");
        
        this.maze = new Maze(mazeMap, this.player.step , "black");
        
        this.goal = new Goal(new Size(size + 5, size - 7), new Coordinates( 4 * widthScale , Math.floor(3 * (ctx.canvas.clientHeight / mazeMap.length)) ), "../../src/assets/goal_apple.png")

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.maze.draw(ctx);
        this.player.draw(ctx);
        this.goal.draw(ctx);
        this.win();
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
        let yellowBox = this.player;
        let blueBox = this.goal;
        let {x : x1, y : y1} = yellowBox.coordinates;
        let {x, y} = blueBox.coordinates; 
        let {width : w1, height : h1} = yellowBox.size;
        let {width : w, height : h} = blueBox.size;
        if(((x <= x1 && x1 <= x + w) && (y <= y1 + h1 && y1 + h1 <= y + h))
         || ((x <= x1 && x1 <= x + w) && (y <= y1 && y1 <= y + h))
         || ((x <= x1 && x1 + w1 <= x + w) && (y <= y1 && y1 <= y + h))
         || ((x <= x1+ w1 && x1 + w1 < x+w) && (y <= y1 + h1 && y1 + h1 < y+h) )
        ){
            // alert( "congratiulations");
            return true;
        }
    }
}
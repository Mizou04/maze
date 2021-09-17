import { Coordinates, Size } from "../../utils/helpers.js";
import { mazeMap } from "../maze/map.maze.js";
import Character from "./character.js"


export default class Player extends Character{
    constructor(size, coordinates){
        super(size, coordinates);
        this.lastPosition = null;
        this.step = Math.floor(this.size.width / 3);
        
        let image = new Image(this.size.width, this.size.height);
            image.src = "player_minotaur.png"
        this.player_image = image;
    }

    draw(ctx){
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        // ctx.drawImage(this.player_image , 0, 0, this.size, this.size, this.coordinates.x , this.coordinates.y, this.size.width, this.size.height);
        ctx.strokeRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
        // ctx.drawImage()
    }

    move(key, ctx){
        ctx.clearRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
        
        console.log(this.lastPosition)
        console.log(this.coordinates)
        this.lastPosition = this.coordinates;

        // if( this.coordinates.x + this.size.width >= parseInt(ctx.canvas.clientWidth) 
        //     || 
        //     this.coordinates.x <= 0 
        //     || 
        //     this.coordinates.y + this.size.height >= parseInt(ctx.canvas.clientHeight)
        //     || 
        //     this.coordinates.y - 10 <= 0
        // ){
        //     this.coordinates = this.lastPosition;
        // } 

        switch(key){
            case "r" : // right
                this.coordinates.x + this.size.width + 10 >= parseInt(ctx.canvas.clientWidth) || (this.coordinates.x += this.step); 
                break;
            case "t" : // top
                this.coordinates.y - this.size.height / 4 <= 0  || (this.coordinates.y -= this.step); 
                break;
            case "l" : // left
                this.coordinates.x - 6 <= 0  || (this.coordinates.x -= this.step); 
                break;
            case "b" : // bottom
                this.coordinates.y + this.size.height >= parseInt(ctx.canvas.clientHeight) || (this.coordinates.y += this.step);
                 break;
        }

        // let goRight = () => {this.coordinates.x += this.step;}, 
        //     goLeft = () => { this.coordinates.x -= this.step}, 
        //     goTop = () => { this.coordinates.y -= this.step}, 
        //     goBottom = () => { this.coordinates.y += this.step};
        //     console.log(this.hasHitObstacle)
        // switch(key){
        //     case "r" : // right
        //         !this.hasHitObstacle && updateLastPosition(goRight()) ;  break;
        //     case "t" : // top
        //         !this.hasHitObstacle && updateLastPosition(goTop) ; break;
        //     case "l" : // left
        //         !this.hasHitObstacle && updateLastPosition(goLeft) ; break;
        //     case "b" : // bottom
        //         !this.hasHitObstacle && updateLastPosition(goBottom) ; break;
        // }
        
    }

}

// new Player(new Size(120, 120), new Coordinates(10, 20))
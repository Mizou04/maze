import { Coordinates, Size } from "../../utils/helpers.js";
import { mazeMap } from "../maze/map.maze.js";
import Character from "./character.js"


export default class Player extends Character{
    constructor(size, coordinates){
        super(size, coordinates);
        this.lastPosition = null;
        this.step = Math.floor(this.size.width / 7);
        
        this.player_image = new Image();
        this.player_image.src = "./player_minotaur.png"
    }
    
    draw(ctx){
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        this.player_image.onload = e =>{
            ctx.drawImage(this.player_image , 0, 0, this.size.width, this.size.height, this.coordinates.x , this.coordinates.y, this.size.width, this.size.height);
        }
        ctx.strokeRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
        // ctx.drawImage()
    }

    move(key, ctx){
        ctx.clearRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
        let collision = 0; // 1 means collision is present. 0 means collision is absent.
     
        
        const checkCollision = () =>{
            let img, imgData;       
            switch(key){
                case "ArrowRight":
                    img = ctx.getImageData(this.coordinates.x + this.size.width, this.coordinates.y, 1, this.size.height);
                    imgData = img.data;
                    for(let i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                        }
                    }
                    break;
                case "ArrowLeft":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y, 1 , this.size.height);
                    imgData = img.data;
                    for(let i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                        }
                    }
                    break;
                case "ArrowUp":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y, this.size.width , 1);
                    imgData = img.data;
                    for(let i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                        }
                    }
                    break;
                case "ArrowDown":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y + this.size.height, this.size.width , 1);
                    imgData = img.data;
                    for(let i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                        }
                    }
                    break;
            }
        }

        switch(key){
            case "ArrowRight" : // right
                if(this.coordinates.x + this.size.width + 10 <= parseInt(ctx.canvas.clientWidth)){
                    this.coordinates.x += this.step;
                    checkCollision();
                    if(collision == 1){
                        this.coordinates.x -= this.step;
                        collision = 0;
                    }
                } 
             
            break;
            case "ArrowUp" : // top
                if(this.coordinates.y - this.size.height / 4 >= 0){
                    this.coordinates.y -= this.step;
                    checkCollision();
                    if(collision == 1){
                        this.coordinates.y += this.step;
                        collision = 0;
                    }
                };
            break;

            case "ArrowLeft" : // left
                if(this.coordinates.x - 6 >= 0){
                    this.coordinates.x -= this.step;
                    checkCollision();
                    if(collision == 1){
                        this.coordinates.x += this.step;
                        collision = 0;
                    }
                }
            break;

            case "ArrowDown" : // bottom 
                if(this.coordinates.y + this.size.height <= parseInt(ctx.canvas.clientHeight)){
                    this.coordinates.y += this.step;
                    checkCollision();
                    if(collision == 1){
                        this.coordinates.y -= this.step;
                        collision = 0;
                    }
                }
            break;
        }


    }

}

// new Player(new Size(120, 120), new Coordinates(10, 20))
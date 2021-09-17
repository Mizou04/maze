import Character from "./character.js"

export default class Goal extends Character{
    constructor(size, coordinates){
        super(size, coordinates);
        this.isAchieved = false;
    }

    draw(ctx){
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        // ctx.drawImage(this.player_image , 0, 0, this.size, this.size, this.coordinates.x , this.coordinates.y, this.size.width, this.size.height);
        ctx.strokeRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
        // ctx.drawImage()
    }
}
import Character from "./character.js"

export default class Goal extends Character{
    constructor(size, coordinates, imgSrc){
        super(size, coordinates, imgSrc);
        this.isAchieved = false;
    }

    draw(ctx){
        ctx.clearRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        let avatar = new Image();
            avatar.src = this.imgSrc;
        avatar.onload = () =>{
            ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height, this.coordinates.x, this.coordinates.y,this.size.width, this.size.height)
        }
        // ctx.strokeRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
    }
}
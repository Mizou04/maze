import Character from "./character.js"


export default class Player extends Character{
    constructor(size, coordinates, imgSrc){
        super(size, coordinates, imgSrc);
        this.step = Math.floor(this.size.width / 10);
        this.flipped = false;
    }
    
    draw(ctx){
        let avatar = new Image();
        avatar.src = this.imgSrc;

        function flipHorizontally(context, around) {
            context.translate(around, 0);
            context.scale(-1, 1);
            context.translate(-around, 0);
            }

            this.clear(ctx);
        avatar.onload = (e) =>{
            if(!this.flipped){
                ctx.restore();
                ctx.drawImage(avatar, 180, 40, avatar.width - 300, avatar.height - 70, this.coordinates.x , this.coordinates.y, this.size.width, this.size.height);
            } else {
                ctx.save();
                flipHorizontally(ctx, this.coordinates.x + this.size.width / 2);
                ctx.drawImage(avatar, 180, 40, avatar.width - 300, avatar.height - 70, this.coordinates.x , this.coordinates.y, this.size.width, this.size.height);
                ctx.restore();
            }
        }
    }

    move(key, ctx){
        this.clear(ctx);
        let collision = 0; // 1 means collision is present. 0 means collision is absent.
     
        
        const checkCollision = (key) =>{
            let img, imgData, i;       
            switch(key){
                case "ArrowRight":
                    img = ctx.getImageData(this.coordinates.x + this.size.width, this.coordinates.y, 1, this.size.height);
                    imgData = img.data;
                    for(i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                            break;
                        }
                    }
                    break;
                case "ArrowLeft":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y, 1 , this.size.height);
                    imgData = img.data;
                    for(i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                            break;
                        }
                    }
                    break;
                case "ArrowUp":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y, this.size.width , 1);
                    imgData = img.data;
                    for(i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                            break;
                        }
                    }
                    break;
                case "ArrowDown":
                    img = ctx.getImageData(this.coordinates.x, this.coordinates.y + this.size.height, this.size.width , 1);
                    imgData = img.data;
                    for(i = 3; i < imgData.length ; i+=4){
                        if(imgData[i] > 0 && imgData[i - 3] == 0){
                            collision = 1;
                            break;
                        }
                    }
                    break;
            }
        }

        switch(key){
            case "ArrowRight" : // right
                if(this.coordinates.x + this.size.width + 10 <= parseInt(ctx.canvas.clientWidth)){
                    this.coordinates.x += this.step;
                    this.flipped = false;
                    checkCollision(key);
                    if(collision == 1){
                        this.coordinates.x -= this.step;
                        collision = 0;
                    }
                } 
             
            break;
            case "ArrowUp" : // top
                if(this.coordinates.y - this.size.height / 4 >= 0){
                    this.coordinates.y -= this.step;
                    checkCollision(key);
                    if(collision == 1){
                        this.coordinates.y += this.step;
                        collision = 0;
                    }
                };
            break;

            case "ArrowLeft" : // left
                if(this.coordinates.x - 6 >= 0){
                    this.flipped = true;
                    if(this.flipped){
                        this.coordinates.x -= this.step;
                    }
                    checkCollision(key);
                    if(collision == 1){
                        this.coordinates.x += this.step;
                        collision = 0;
                    }
                }
            break;

            case "ArrowDown" : // bottom 
                if((this.coordinates.y) <= parseInt(ctx.canvas.clientHeight)){
                    this.coordinates.y += this.step;
                    checkCollision(key);
                    if(collision == 1){
                        this.coordinates.y -= this.step;
                        collision = 0;
                    }
                }
            break;
        }

    }
    clear(ctx){
        ctx.clearRect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height)
    }
}


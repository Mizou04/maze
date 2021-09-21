
export default class Maze{
    constructor(blueprint, thickness, wallColor = "red", touched){
        this.blueprint = blueprint; // 2D array
        this.thickness = thickness; // thickness of the walls
        this.wallColor = wallColor;
        this.touched = touched; // a wall touched
    }

    draw(ctx){
        let {canvas : cv} = ctx;
        let map = new Image();
            map.src = "../../src/assets/modifiedMaze.png"
        map.onload = () =>{
            ctx.drawImage(map, 0, 0, map.width, map.height, 0, 0, cv.width , cv.height)
        }
    }

    // draw(ctx){
    //     let wallsMap =  this.blueprint;
    //     let cellWidth = ctx.canvas.width / wallsMap.length;
    //     let cellHeight = ctx.canvas.height / wallsMap.length;
    //     let j, i, wideness, tallness, cell;
        
    //     ctx.strokeStyle = this.wallColor;
    //     ctx.lineWidth = this.thickness;
    //     function drawHorizontalLine(i, j){
    //         ctx.moveTo(cellWidth * i - (ctx.lineWidth / 2) , cellWidth * j);
    //         ctx.lineTo(cellWidth * (i+1), cellWidth * (j));
            
    //     }
    //     function drawVerticalLine(i, j){
    //         ctx.moveTo(cellHeight * (i + 1), cellHeight * (j) - (ctx.lineWidth / 2));
    //         ctx.lineTo(cellHeight * (i + 1), cellHeight * (j + 1) + (ctx.lineWidth / 2))
            
    //     }
        
    //     for(j = 0, tallness = wallsMap.length; j < tallness ; j++){
    //         for(i = 0, wideness = wallsMap[j].length; i < wideness; i++){
    //             cell = wallsMap[j][i];
    //             if(cell === 2){
    //                 drawHorizontalLine(i, j);
    //             };
    //             if(cell === 1){
    //                 drawVerticalLine(i, j)
    //             };
    //             if(cell === 3){
    //                 drawVerticalLine(i, j);
    //                 drawHorizontalLine(i , j);
    //             }
    //         }
    //     }
    //     ctx.stroke()
    // }
}
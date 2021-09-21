import {Coordinates, Size} from "../../utils/helpers.js"


export default class Character{
    constructor(size, coordinates, imgSrc){
        this.size = size;
        this.coordinates = coordinates;
        this.imgSrc = imgSrc;
        
        if(this.coordinates instanceof Coordinates === false){
            throw Error("not instance of Coordinates class");
        }
        if(this.size instanceof Size === false){
            throw Error("not instance of Size class");
        }
    }
};


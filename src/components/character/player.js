import Character from "./character.js"

export default class Player extends Character{
    constructor(size, coordinates){
        super(this.size, this.coordinates);
        this.hasHitObstacle = false;
    }
}
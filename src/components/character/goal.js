import Character from "./character.js"

export default class Goal extends Character{
    constructor(size, coordinates){
        super(this.size, this.coordinates);
        this.achieved = false;
    }
}
export class Coordinates{
    constructor(x, y){
        this.x = x;
        this.y = y;

        if(typeof this.x !== "number"){
            throw Error("not a number. insert a number")
        }
        if(typeof this.y !== "number"){
            throw Error("not a number. insert a number")
        }
    }
}

export class Size{
    constructor(height, width){
        this.height = height;
        this.width = width;

        if(typeof this.height !== "number"){
            throw Error("not a number. insert a number")
        }
        if(typeof this.width !== "number"){
            throw Error("not a number. insert a number")
        }
    }
}


export function toTypeString(obj){
    let toString = Object.prototype.toString
    
    return toString.call(obj);
}

export class Interface{ //Interface
    constructor(){
        this._strategies = [];
    }

    addStrategy(...strategy){
        this._strategies = [...this._strategies, ...strategy];
    }

    getStrategy(name){
        return this._strategies.find(strategie => strategie.name === name).page;
    }
};
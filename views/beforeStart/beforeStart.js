import Page from '../page.js'

export default class StartPage extends Page{
    constructor(name, title){
        super(title);
        this.name = name;
        this.levels = [1, 2, 3]
        
        this.page.classList.add("page__startpage");
        this.container.classList.add("page__startpage--container")
        
        this.returnBtn = this.createElement("button", "page--button-back");
        this.selectorLabel = this.createElement("label", "page__startpage--label" ,"page__startpage--label-select")
        this.selector = this.createElement("select", "page__startpage--select")
        this.startBtn = this.createElement("button","page--button" ,"page__startpage--button");

        this.returnBtn.innerText = "x"
        this.selectorLabel.innerText = "map :"
        this.startBtn.innerText = "start";     

        this.levels.forEach((level, index)=>{
            let option = this.createElement("option", "page__startpage--select-option");
            option.value = level;
            option.innerText = "level "+level;
            this.selector.append(option)
        })
        
        console.log(this.startBtn)
        this.selectorLabel.append(this.selector);
        this.container.append(
            this.selectorLabel,
            this.startBtn
            )
            
        this.page.append(
            this.title,
            this.returnBtn,
            this.container
        );
    };

};



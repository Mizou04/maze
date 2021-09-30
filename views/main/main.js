import Page from '../page.js'

export default class MainPage extends Page{
    constructor(name, title){
        super(title);
        this.name = name;
        
        this.page.classList.add("page__main");
        this.container.classList.add("page__main--container")
        
        this.startNewGameBtn = this.createElement("button", "page--button","page__main--button", "page__main--button-start");
        this.instructionsBtn = this.createElement("button", "page--button","page__main--button", "page__main--button-instructions");
        this.highscoresBtn = this.createElement("button", "page--button","page__main--button", "page__main--button-highscores");
        

        this.startNewGameBtn.innerText = "start";
        this.instructionsBtn.innerText = "instructions";
        this.highscoresBtn.innerText = "highscores";


        this.container.append(
            this.startNewGameBtn,
            this.instructionsBtn,
            this.highscoresBtn
            )
            
        this.page.append(
            this.title, 
            this.container
        );
    }
};


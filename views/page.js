export default class Page{
    constructor(title){
        this.title = this.createElement("h1", "page--title");
        this.makeTitle(title);
        this.page = this.createElement("div", "page");
        this.container = this.createElement("div", "page--container");
    }


    makeTitle(title){
        this.title.textContent = title;
    }
    createElement(el, ...className){
        let element = document.createElement(el);
            element.classList.add(...className);
        return element
    }
}
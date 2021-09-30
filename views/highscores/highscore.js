import Page from "../page.js";

export default class HighscoresPage extends Page{
    constructor(name, title = "highscores"){
        super(title = "Highscores");
        this.name = name;

        this.page.classList.add("page__main");
        this.container.classList.add('page__highscores--container');
        this.returnBtn = this.createElement("button", "page--button-back");
        this.table = this.createElement("table", "page__highscores--table")
        this.tHead = this.createElement("tHead", "page__highscores--table-head")
        this.tBody = this.createElement("tBody", "page__highscores--table-body")
        this.headName = this.createElement("th", "page__highscores--table-th", "page__highscores--table-th-name")
        this.headScore = this.createElement("th", "page__highscores--table-th", "page__highscores--table-th-score")
        this.headPosition = this.createElement("th", "page__highscores--table-th", "page__highscores--table-th-position")
        this.tCell = this.createElement("td", "page__highscores--table-cell");
        this.highscores = JSON.parse(localStorage.getItem("HIGH_SCORES"));

        this.headPosition.innerHTML = "#"
        this.headName.innerHTML = "Name"
        this.headScore.innerHTML = "Score"
        this.returnBtn.innerHTML = "X";

        const scores = JSON.parse(localStorage.getItem("HIGH_SCORES"));

        let i, length = 6;
        for(i = 0; i < scores.length; i++){
        this.tRow = this.createElement("tr", "page__highscores--table-row");
            this.tRow.innerHTML = `
            <td class='page__highscores--table-td page__highscores--table--td-index'>${i}</td>
            <td class='page__highscores--table-td page__highscores--table--td-name'>${scores[i]?.name}</td>
            <td class='page__highscores--table-td page__highscores--table--td-score'>${scores[i]?.score}</td>`
            this.tBody.append(this.tRow);
        }
        if(scores.length >= length){
            scores.length = length;
        }   
        // console.log(this.page.outerHTML)
        this.tHead.append(this.headPosition,this.headName, this.headScore);
        this.table.append(this.tHead, this.tBody);
        this.container.append(this.table);
        this.page.append(this.title ,this.container, this.returnBtn);
    }
}
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-btns')

//det som håller koll på vad vår karaktär bär på
let state= {}

//här står det vad starten ska innebära
function startGame() {
    state = {} //karaktären börjar med 0 saker på sig
    showTextNode(1)
}

function showTextNode(textNodeIndex) {

}

function selectOption(option) {

}

const textNodes = [
    {
      id: 1, 
      text: 'Det är nästan 40 grader varmt och du har precis klivit av på Atacams öken på jakt efter guld när du i din vy redan ser något som glimrar. Du ser att det är en liten ask',
      options: [
        { //valmöjligheterna
            text:'Ta den glimmrande asken',
            setState: {glimmrandeAsk: true}, //om karaktären väljer att ta asken
            nextText: 2  //dit den går vidare om den tar asken
        },
        {
            text:'Lämna asken',
            nextText: 2
        }
      ]   
    },
    {   //nästa steg
        id: 2
    }
]

//kommer upp så fort spelet laddas
startGame()
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
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) //gör så att rätt textnode syns
    textElement.innerText = textNode.text //visar den aktuella texten
    while (optionButtonsElement.firstChild){ //gör så att knapparna inte blir synliga i första delen
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
}

function selectOption(option) { //så att vi vet vilket val som tagits

}

const textNodes = [
    {
      id: 1, 
      text: 'Tiden du har väntat på har anlänt. Du befinner dig i Atacamaöknen på jakt efter guld, när du helt plötsligt ser något som glimrar precis vid dina fötter. Det är inte guld men en liten glimrande ask',
      options: [
        { //valmöjligheterna
            text:'Ta den glimmrande asken',
            setState: { glimmrandeAsk: true }, //om karaktären väljer att ta asken
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
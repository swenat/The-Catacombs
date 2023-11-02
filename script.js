const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

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
    while (optionButtonsElement.firstChild) { //gör så att knapparna inte blir synliga i första delen
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    
    textNode.options.forEach(option => {  //en loop som går igenom valen och ser om den kan visa val
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn') //lägger till knappen och id så att den får rätt styling
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state) //ingen krävd status eller om det krävda statuset uppnås så visas valet
}

function selectOption(option) { //så att vi vet vilket val som tagits
    const nextTextNodeId = option.nextText 
    state = Object.assign(state, option.setState) // tar vår nuvarande status, adderar allt i valstatusen och skriver över det som finns där redan
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
      id: 1, 
      text: 'Tiden du har väntat på har anlänt. Du befinner dig i Atacamaöknen på jakt efter guld, när du helt plötsligt ser något som glimrar precis vid dina fötter. Det är inte guld men en liten glimrande ask.',
      options: [
        { //valmöjligheterna
            text:'Ta asken',
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
        id: 2,
        text: 'Du går vidare för att se var du kan börja gräva efter potentiellt guld när du stöter på en man. Han verkar sälja saker för guldgrävande.',
        options: [
            {
                text: 'Köpslå om en karta mot din ask',
                requiredState: (currentState) => currentState.glimmrandeAsk,  //en kontrollfunktion för att se om vi har asken
                setState: { glimmrandeAsk: false, karta: true },
                nextText: 3
            },
            {
                text: 'Köpslå om en kompass mot din ask',
                requiredState: (currentState) => currentState.glimmrandeAsk,  //en kontrollfunktion för att se om vi har asken
                setState: { glimmrandeAsk: false, kompass: true },
                nextText: 3 
            },
            {
                text: 'Ignorera mannen',
                setState: { glimmrandeAsk: false, kompass: true },
                nextText: 3 
            }
        ]
    }

]

//kommer upp så fort spelet laddas
startGame()
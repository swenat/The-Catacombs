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
    if (nextTextNodeId <= 0) { //om detta stämmer så går den till nedan och startar om spelet
        return startGame()
    }
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
                text: 'Köpslå om en spade mot din ask',
                requiredState: (currentState) => currentState.glimmrandeAsk,  //en kontrollfunktion för att se om vi har asken
                setState: { glimmrandeAsk: false, spade: true },
                nextText: 3
            },
            {
                text: 'Köpslå om en guldhacka mot din ask',
                requiredState: (currentState) => currentState.glimmrandeAsk,  //en kontrollfunktion för att se om vi har asken
                setState: { glimmrandeAsk: false, guldhacka: true },
                nextText: 3 
            },
            {
                text: 'Ignorera mannen',
                nextText: 3 
            }
        ]
    },
    {
        id:3,
        text: 'Efter att ha letat efter guld i flera timmar känner du dig alldeles slut. Inget guld och du är svettig och trött. Du behöver hitta någonstans att sova så du beger dig upp mot bergen där du vet att det finns en by.',
        options: [
            {
                text: 'Du ser en liten hydda dit du går in',
                nextText: 4
            },
            {
                text: 'Du ser en gammal lada och lägger dig inne bland kossorna',
                nextText: 5
            },
            {
                text: 'Du går upp till en grotta där du lägger dig och gör upp eld',
                nextText: 6
            }
        ]
    },
    {
        id: 6, 
        text: 'Du märker inte men i grottan du befinner dig i fanns en björn i idé. Du väckte honom vilket resulterade i en enorm ilska hos björnen och du hann tyvärr ej fly. Du blir dödad.',
        options: [
            {
                text: 'Omstart',
                nextText: -1 //steg under första 
            }
        ]
    
    }
]

//kommer upp så fort spelet laddas
startGame()
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('Music/nowhere.mp3')

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

    journey.src = textNode.image;
    
    textNode.options.forEach(option => {  //en loop som går igenom valen och ser om den kan visa val
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn') //lägger till knappen och id så att den får rätt styling
            button.addEventListener('click', () => selectOption(option))
            backgroundMusic.play()
            backgroundMusic.volume = 0.5
            backgroundMusic.loop = true
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
      text: 'The time has come for your dream or nightmare to begin.' + '\r\n' + 'Your trip has taken you to the Catacombs of Paris.' + '\r\n' + 'The entrance reads: "Stop! This is the Empire of the dead."' + '\r\n' + 'Your guide wants to give you a map. Do you take it?',
      image: "Images/entrance_catacombs.jpg",
      options: [
        { //valmöjligheterna
            text:'Take the map',
            setState: { mapofDoom: true }, //om karaktären väljer att ta asken
            nextText: 2  //dit den går vidare om den tar asken
        },
        {
            text:'Do not take the map',
            nextText: 2
        }
      ]   
    },
    {   //nästa steg 
        id: 2,
        text: 'You proceed and enter to the first chamber. Here you meet a stranger who asks if you wish to enter a secret path of the chambers and if so with lights or without. Without lights means that you can see hidden inscriptions on the walls. Either choice meanas you need to give him your map.',
        image: "Images/catacomb1.jpg",
        options: [
            {
                text: 'You give him your map and choose with lights',
                requiredState: (currentState) => currentState.mapofDoom,  //en kontrollfunktion för att se om vi har lappen för dolda vägen
                setState: { mapofDoom: false, secretPathNote: true },
                nextText: 3
            },
            {
                text: 'You give him your map but want no lighting',
                requiredState: (currentState) => currentState.mapofDoom,  //en kontrollfunktion för att se om vi har kartan
                setState: { mapofDoom: false, guldhacka: true },
                nextText: 3 
            },
            {
                text: 'Ignore the stranger',
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
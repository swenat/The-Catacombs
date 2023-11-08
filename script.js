const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('Music/caves.mp3')

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
    { // First scene, entrance
      id: 1,
      text: 'The time has come for your dream or nightmare to begin.' + '\r\n' + 'Your trip has taken you to the Catacombs of Paris.' + '\r\n' + 'The entrance reads: "Stop! This is the Empire of the dead."' + '\r\n' + 'Your guide wants to give you a map. Do you take it?',
      image: "Images/entrance_catacombs.jpg",
      options: [
        { //The different choices shown as buttons
            text:'Take the map',
            setState: { mapofDoom: true }, //If the caracter decides ot take the item
            nextText: 2  //Where it goes next if the caracter has taken the item
        },
        {
            text:'Do not take the map',
            nextText: 2
        }
      ]   
    },
    {   //Scene 2 - The sign
        id: 2,
        text: 'You proceed and enter to the first chamber. It leeds to a sign that you wish to read.',
        image: "Images/catacombs_room2.png",
        options: [
            {
                text: 'Aproach the sign',
                nextText: 3
            }
        ]   
    },
    {   //Scene 3 - sign approached
        id: 3,
        text: 'On the sign it says something in french. You do not understand what it says.',
        image: "Images/catacomb_room2_sign.jpg",
        options: [
            {
                text: 'Use the back of the map for translation',
                requiredState: (currentState) => currentState.mapofDoom,  //Control to see if we have the map before getting the translation
                nextText: 4
            },
            {
                text: 'Proceed without translation',
                nextText: 7
            }
        ]   
        
    },
    {   //Scene 4  - Translation of sign
        id: 4,
        text: 'The sign says: "Bones from the old Magdaleine cemetery deposited in 1844 in the western ossuary and transferred to the catacombs in September 1859". Interesting facts you thing to yourself while turning around to proceed.'+ '\r\n' + 'Suddenly a stranger aproaches you and wants to give you a note.',
        image: "Images/stranger.jpg",
        options: [
            {
                text: 'You hesitate first but take it',
                setState: { secretNote: true }, 
                nextText: 5
            },
            {
                text: 'You ignore the stranger',
                requiredState: (currentState) => currentState.mapofDoom,  //en kontrollfunktion för att se om vi har lappen för dolda vägen
                nextText: 6
            }
        ]        
    },
    {   //Scene 4 - 
        id: 4,
        text: 'On the note you see a riddle. If you know the answer make the right choice next. You turn around in the  new room to see if you see something. On the floor there is a knife and a torch.',
        image: "Images/paper.png",
        options: [
            {
                text: 'You take the knife',
                requiredState: (currentState) => currentState.secretNote,
                setState: { secretNote: false, knife: true},
                nextText: 4
            },
            {
                text: 'You take the torch',
                setState: { secretNote: false, fireTorch: true},
                nextText: 5
            },
            {
                text: 'You take none',
                setState: { secretNote: false},
                nextText: 6
            }
        ]
    },
    {   //Scen 3
        id: 3,
        text: 'On the note you see a riddle. If you know the answer make the right choice next. You turn around in the  new room to see if you see something. On the floor there is a knife and a torch.',
        image: "Images/paper.png",
        options: [
            {
                text: 'You take the knife',
                requiredState: (currentState) => currentState.secretNote,
                setState: { secretNote: false, knife: true},
                nextText: 4
            },
            {
                text: 'You take the torch',
                setState: { secretNote: false, fireTorch: true},
                nextText: 5
            },
            {
                text: 'You take none',
                setState: { secretNote: false},
                nextText: 6
            }
        ]
    },
    {   //Scen 3
        id: 4,
        text: 'On the note you see a riddle. If you know the answer make the right choice next. You turn around in the  new room to see if you see something. On the floor there is a knife and a torch.',
        image: "Images/paper.png",
        options: [
            {
                text: 'You take the knife',
                requiredState: (currentState) => currentState.secretNote,
                setState: { secretNote: false, knife: true},
                nextText: 4
            },
            {
                text: 'You take the torch',
                setState: { secretNote: false, fireTorch: true},
                nextText: 5
            },
            {
                text: 'You take none',
                setState: { secretNote: false},
                nextText: 6
            }
        ]
    },
    {   //Scen 4
        id: 4,
        text: 'You chose the wrong item but hopefully this will help you anyway. You have entered a new room ',
        image: "Images/paper.png",
        options: [
            {
                text: 'You take the knife',
                requiredState: (currentState) => currentState.secretNote,
                setState: { secretNote: false, knife: true},
                nextText: 4
            },
            {
                text: 'You take the torch',
                setState: { secretNote: false, fireTorch: true},
                nextText: 5
            },
            {
                text: 'You take none',
                setState: { secretNote: false},
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
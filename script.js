const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('Music/caves.mp3')

//what keeps record of what our character is carrying
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
    { // Scene 1 - Entrance 
        id: 1,
        text: '1774 - The Parisian Catacombs.' + '\r\n' + 'When so many perished in diseases there was no choice for the parisians more than to make sure that there was space enough space for more dead on the graveyards. Therefor they moved up to 6 million skeletons to their new restingplace. Many believe these became restless souls, moving around in the 20 meter deep grave, wondering why their peace was disturbed..',
        image: "Images/old_catacomb.jpg",
        options: [
          { //The different choices shown as buttons
              text:'Click here to start',
              nextText: 2
              
          }
        ]  
    },
        { // Scene 2 - Enter 
            id: 2,
            text: 'Your guide awaits. He wants to give you a map in case you get lost.',
            image: "Images/old_catacomb.jpg",
            options: [
              { //The different choices shown as buttons
                  text:'Click here to start',
                  nextText: 2
                  
              }
            ]    
    


            //End

    },
    {

        id: -17, 
        text: 'Fel svar. En vålnad får tag i dig när din eld plötsligt dör ut.',
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
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('Music/caves.mp3')

//what keeps record of what our character is carrying
let state= {}

//here it says what the start means
function startGame() {
    state = {} //the character begins with no items on in state
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) //makes sure that the right textnode is shown
    textElement.innerText = textNode.text //shows the actual text
    while (optionButtonsElement.firstChild) { //does so that the first buttons aren´t shown the first time
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    journey.src = textNode.image;
    
    textNode.options.forEach(option => {  //a loop that goes through the choices to make sure if it can show it
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
    { // Scene 1 - History 
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
    {   //Scene 2 - Entrance
        id: 2,
        text: 'In the door you meet one of the guides. With a hoarse voice he tells you "Congratulations, you have won the opportunity to go on on a separate private tour that includes a game. He wants to give you a free ticket. Are you up for it?',
        image: "Images/guide_entrance.jpg",
        options: [
            {
                text: 'You accept',
                setState: { privateTicket: true },
                nextText: 3
            },
            {
                text: 'You decline',
                nextText: 4 
            }
        ]
    },
    {   //Scene 3 - Accepted
        id: 3,
        text: 'He leads you trough a hallway where he says that you must proceed alone and solve a riddle that will take you to the next phase. He wishes you good luck.',
        image: "Images/guide_hall.jpg",
        options: [
            {
                text: 'You proceed',
                nextText: 5
            }
        ]
},
{   //Scene 4 - You decline offer
    id: 4,
    text: 'Youre not feeling well today so you decline and go stand in line for the usual tour.',
    image: "Images/paris_tour.jpg",
    options: [
        {
            text: 'You go back',
            nextText: -1
        }
    ]
},
{   //Scene 5 - Meeting the guide
    id: 5,
    text: 'There you meet your guide Bernaut. You give him your ticket. He says that the game has begun and that the first quest is to solve the murder of a man named Philibert Aspairt. He tells you that he was a man that dissapeared 1793 and that he 11 years later was found in the catacombs. He had probably tried to reach a nearby brewery and didn´t unfortunatly. He died alone, slowly and in the dark. The guide asks you to read the first riddle  in the letter and guess.',
    image: "Images/stranger_letter.jpg",
    options: [
        {
            text: 'You take the letter and read it',
            setState: { privateTicket: false, letterRiddle: true},
            nextText: 6
        }
    ]

},
{   //Scene 6 - The first Riddle
    id: 6,
    text: 'What is your answer? If you answer correctly you are given a goldkey to proceed.',
    image: "Images/paper.png",
    options: [
        {
            text: 'Cole',
            setstate: { letterRiddle:false},
            nextText: 8
        },
         {
            text: 'Fire',
            setState: { letterRiddle:false, goldenKey:true},
            nextText: 9
        },
    ]
},
{   //Scene 8 - Wrong answer
    id: 8,
    text: 'The guide says: Sorry my friend, wrong answer but if youre lucky you can play again..',
    image: "Images/golden_key.jpg",
    options: [
        {
            text: 'Exit',
            nextText: -1
        }
    ]
},
{   //Scene 8 - Right answer
    id: 9,
    text: 'Right answer. You may now follow the stairs ahead with the guide to the next level. You take a few steps and suddenly a strange voice speaks. Your highschool french is a bit rusty but somehow you hear "méfiez-vous"..French for beware. The guide laughs a bit seeing you so scared and says that it must be some youths in the catacomb trying to scare us.',
    image: "Images/stairs_begin.jpg",
    options: [
        {
            text: 'Proceed',
            nextText: 10
        }
    ]
},
{   //Scene 10 - Second Riddle
    id: 10,
    text: 'The guide: "Riddle number two was found a few days ago and I cannot seem to solve it. May you help me? The riddle says: "The person who built it sold it. The person who bought it never used it. The person who used it never saw it. What is it?',
    image: "Images/oldman_hat.jpg",
    options: [
        {
            text: 'Coffin',
            nextText: 11
        },
        {
            text: 'Goldcoin',
            nextText: 8
        }
    ]
},
{   //Scene 11 - The light goes off
    id: 11,
    text: 'Suddenly the light goes off and when it´s turned on again you see the guide lying on the floor dead. No else is in the room. What do you do?',
    image: "Images/oldman_floor.jpg",
    options: [
        {
            text: 'You turn around',
            nextText: 12
        }
    ]

},
{   //Scene 11 - The skeleton with the swords
    id: 12,
    text: 'You see a skeleton with two swords and feel the instinct to take one or two to protect yourself.',
    image: "Images/sword.jpg",
    options: [
        {
            text: 'You take one',
            setState: { goldenKey:true, oneSword: true},
            nextText: 13
        },
        {
            text: 'You take both',
            setState: { goldenKey:true, twoSwords: true},
            nextText: 13
        },

    ]

    
},
{   //Scene 13 - The fight
    id: 13,
    text: 'You hear a sound behind you and you turn around once again.' + '\r\n' + 'There he is, the ghost of Philibert. What do you do?',
    image: "Images/philibert_fight.jpg",
    options: [
        {
            text: 'You fight him',
            requiredState: (currentState) => currentState.oneSword,
            nextText: 14
        },
        {
            text: 'You fight him',
            requiredState: (currentState) => currentState.twoSwords,
            nextText: 15
        },

    ]
        
},
{   //Scene 14 - Defeat 
    id: 14,
    text: 'You fight and manage to escape with him running behind you. Unfortunatly your sword was torn in two. You run for 20 minutes into the darkness until you come to a halt. You must decide what to do next.',
    image: "Images/burning_torch.jpg",
    options: [
        {
            text: 'Turn left',
            setState: { oneSword: false, halfSword: true},
            nextText: 17
        },
        {
            text: 'Turn right',
            setState: { oneSword: false, halfSword: true},
            nextText: 16
        }

    ]
          
},
{   //Scene 15 -  Two swords
    id: 15,
    text: 'You have never fought with swords. No less with two. You are incredibly clumsy and you do not stand a chance. Youre dead.',
    image: "Images/philibert_scary.png",
    options: [
        {
            text: 'Start again',
            requiredState: (currentState) => currentState.twoSwords,
            setState: { goldenKey:false, twoSwords: false},
            nextText: -1
        }

    ]

},
{   //Scene 16 - Turn right - The tomb
    id: 16,
    text: 'You reach a tomb and think about the last riddle. Its his tomb..You open it and find thousands of goldcoins but no body. You hear his voice coming closer and closer..You have two choices: Fill pockets with gold or run',
    image: "Images/philibert_death.jpg",
    options: [
        {
            text: 'Fill pockets',
            setState: { goldenKey:false, twoSwords: false, goldCoins:true},
            nextText: 20
        },
        {
            text: 'You run',
            nextText: 20
        }

    ]
},
{   //Scene 17 - Turn left - Dead end
    id: 17,
    text: 'You have reached a dead end.',
    image: "Images/dead_end.jpg",
    options: [
        {
            text: 'Turn back',
            nextText: 14
        }
    ]

    
},
{   //Scene 20 - The door
    id: 20,
    text: 'You run and see a door from far. His voice is getting closer..You get stressed.',
    image: "Images/dark_cell.jpg",
    options: [
        {
            text: 'Drop your half sword and open with key',
            requiredState: (currentState) => currentState.goldenKey,
            setsetState: {halfSword: false, goldenKey:true},
            nextText: 22
        },
        {
            text: 'You try to open it',
            requiredState: (currentState) => currentState.goldCoins,
            nextText: 21
        }

    ]

        
},
{   //Scene 20 - Exit
    id: 22,
    text: 'The celldoor leads to a hallway and then..exit. You are lucky to have survived. You made the right choices and live to tell the tale of Philibert Ghost...',
    image: "Images/exit_catacombs.jpg",
    options: [
        {
            text: 'EXIT',
            setState: { goldenKey: false},
            nextText: -1
        }

    ]
        
},
{   //Scene 21 - Death
    id: 21,
    text: 'Greed is never flattering. Not taking the key with you has turned out to be the last thing you would regret. You turn around, and there he is.' + '\r\n'+ 'Youre DEAD.',
    image: "Images/scary_death.jpg",
    options: [
        {
            text: 'Play again',
            setState: { goldenCoins: false},
            nextText: -1
        }

    ]
    
    }
] 

//kommer upp så fort spelet laddas
startGame()
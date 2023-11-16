//Get reference to HTML elements
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundMusic = new Audio('Music/caves.mp3')
// let state= {};   tagit bort temporärt för att se om det är detta som gör så att användaren kan fortsätta efter en reload

// To save game state 
function saveGame(nextTextNode) {
	state.savedTextNode = nextTextNode;
	state.musicPlaybackTime = backgroundMusic.currentTime; 

	localStorage.setItem('gameState', JSON.stringify(state)); // For storing game state in local storage

}

function loadGame() {
	const savedState = localStorage.getItem('gameState');
	if (savedState) {
		state = JSON.parse(savedState); // For reading
		isMusicPlaying = state.isMusicPlaying || false;
		if (state.musicPlaybackTime && isMusicPlaying) {
            // Resume music from where it left off
            backgroundMusic.currentTime = state.musicPlaybackTime;
            backgroundMusic.play();
        }
	}
}
// Function to start the game
function startGame() {
	hasMusicStarted = false;
	state = {} // the character begins with no items on in state
	loadGame();
	showTextNode(state.savedTextNode || 1);

}

//Function to display a specific textnode 
function showTextNode(textNodeIndex) {
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) 
	 // shows the actual text
	while (optionButtonsElement.firstChild) { // does so that the first buttons aren´t shown the first time
		optionButtonsElement.removeChild(optionButtonsElement.firstChild) //removes existing option buttons
	}
	
	if (!hasMusicStarted) {  
		backgroundMusic.play(); //play background music
		backgroundMusic.volume = 0.5;
		backgroundMusic.loop = true;
		hasMusicStarted = true;
	  } else if (state.isMusicPlaying) { 
		// Resume music from where it left off when refreshed
		backgroundMusic.currentTime = state.musicPlaybackTime || 0;
		backgroundMusic.play();
	  }
	
	//display options as buttons  
	textElement.innerText = textNode.text
	journey.src = textNode.image;

	textNode.options.forEach(option => { // a loop that goes through the choices to make sure if it can show it
		if (showOption(option)) {
			const button = document.createElement('button')
			button.innerText = option.text
			button.classList.add('btn') // adds a button and id so that it´s visible
			button.addEventListener('click', () => selectOption(option))
			optionButtonsElement.appendChild(button)
		}
	});
}

function showOption(option) { // Function to determine if an option should be shown based on required state
	return option.requiredState == null || option.requiredState(state) // no required state or if the required state is reached then the option is shown
}

function selectOption(option) { // so that we know which option has been chosen
	const nextTextNodeId = option.nextTextNode
	if (nextTextNodeId <= 0) { //if this is correct it moves further down och restarts the game
		localStorage.clear()
		return startGame()
	}
	state = Object.assign(state, option.setState) // takes our current status, adds everything in the choice options och rewrites whats already there
	saveGame(nextTextNodeId);
	setTimeout(() => {
        state.isMusicPlaying = !backgroundMusic.paused;
    }, 500);
	
	showTextNode(nextTextNodeId)
}
const textNodes = [{ // Array of text nodes representing different scenes in the game
	id: 1, // Scene 1 - History 
	text: '1774 - The Parisian Catacombs.' + '\r\n' + 'When so many perished in diseases there was no choice for the parisians more than to make sure that there was space enough space for more dead on the graveyards. Therefor they moved up to 6 million skeletons to their new restingplace. Many believe these became restless souls, moving around in the 20 meter deep grave, wondering why their peace was disturbed..',
	image: "Images/old_catacomb.jpg",
	options: [{ //The different choices shown as buttons
		text: 'Click here to start',
		nextTextNode: 2
	}]
}, { //Scene 2 - Entrance
	id: 2,
	text: 'In the door you meet one of the guides. With a hoarse voice he tells you "Congratulations, you have won the opportunity to go on on a separate private tour that includes a game. He wants to give you a free ticket. Are you up for it?',
	image: "Images/guide_entrance.jpg",
	options: [{
		text: 'You accept',
		setState: {
			privateTicket: true
		},
		nextTextNode: 3
	}, {
		text: 'You decline',
		nextTextNode: 4
	}]
}, { //Scene 3 - Accepted
	id: 3,
	text: 'He leads you trough a hallway where he says that you must proceed alone and solve a riddle that will take you to the next phase. He wishes you good luck.',
	image: "Images/guide_hall.jpg",
	options: [{
		text: 'You proceed',
		nextTextNode: 5
	}]
}, { //Scene 4 - You decline offer
	id: 4,
	text: 'Youre not feeling well today so you decline and go stand in line for the usual tour.',
	image: "Images/paris_tour.jpg",
	options: [{
		text: 'You go back',
		nextTextNode: -1
	}]
}, { //Scene 5 - Meeting the guide
	id: 5,
	text: 'There you meet your guide Bernaut. You give him your ticket. He says that the game has begun and that the first quest is to solve the murder of a man named Philibert Aspairt. He tells you that he was a man that dissapeared 1793 and that he 11 years later was found in the catacombs. He had probably tried to reach a nearby brewery and didn´t unfortunatly. He died alone, slowly and in the dark. The guide asks you to read the first riddle  in the letter and guess.',
	image: "Images/stranger_letter.jpg",
	options: [{
		text: 'You take the letter and read it',
		setState: {
			privateTicket: false,
			letterRiddle: true
		},
		nextTextNode: 6
	}]
}, { //Scene 6 - The first Riddle
	id: 6,
	text: 'What is your answer? If you answer correctly it will help you further on.',
	image: "Images/paper.png",
	options: [{
		text: 'Cole',
		setState: {
			letterRiddle: false
		},
		nextTextNode: 8
	}, {
		text: 'Fire',
		setState: {
			letterRiddle: false
		},
		nextTextNode: 9
	}, ]
}, { //Scene 8 - Wrong answer
	id: 8,
	text: 'The guide says: Sorry my friend, wrong answer but if youre lucky you can play again..',
	image: "Images/golden_key.jpg",
	options: [{
		text: 'Exit',
		nextTextNode: -1
	}]
}, { //Scene 8 - Right answer
	id: 9,
	text: 'Right answer. You may now follow the stairs ahead with the guide to the next level. You take a few steps and suddenly a strange voice speaks. Your highschool french is a bit rusty but somehow you hear "méfiez-vous"..French for beware. The guide laughs a bit seeing you so scared and says that it must be some youths in the catacomb trying to scare us.',
	image: "Images/stairs_begin.jpg",
	options: [{
		text: 'Proceed',
		nextTextNode: 10
	}]
}, { //Scene 10 - Second Riddle
	id: 10,
	text: 'The guide: "Riddle number two was found a few days ago and I cannot seem to solve it. May you help me? The riddle says: "The person who built it sold it. The person who bought it never used it. The person who used it never saw it. What is it?',
	image: "Images/oldman_hat.jpg",
	options: [{
		text: 'Coffin',
		nextTextNode: 11
	}, {
		text: 'Goldcoin',
		nextTextNode: 8
	}]
}, { //Scene 11 - The light goes off
	id: 11,
	text: 'Suddenly the light goes off and when it´s turned on again you see the guide lying on the floor dead. No else is in the room. What do you do?',
	image: "Images/oldman_floor.jpg",
	options: [{
		text: 'You turn around',
		nextTextNode: 12
	}]
}, { //Scene 11 - The skeleton with the swords
	id: 12,
	text: 'You see a skeleton with two swords and feel the instinct to take one or two to protect yourself.',
	image: "Images/sword.jpg",
	options: [{
		text: 'You take one',
		setState: {
			oneSword: true
		},
		nextTextNode: 13
	}, {
		text: 'You take both',
		setState: {
			twoSwords: true
		},
		nextTextNode: 13
	}, ]
}, { //Scene 13 - The fight
	id: 13,
	text: 'You hear a sound behind you and you turn around once again.' + '\r\n' + 'There he is, the ghost of Philibert. What do you do?',
	image: "Images/philibert_fight.jpg",
	options: [{
		text: 'You fight him',
		requiredState: (currentState) => currentState.oneSword,
		nextTextNode: 14
	}, {
		text: 'You fight him',
		requiredState: (currentState) => currentState.twoSwords,
		nextTextNode: 15
	}, ]
}, { //Scene 14 - Defeat 
	id: 14,
	text: 'You fight and manage to escape with him running behind you. Unfortunately your sword was torn in two. You run for 20 minutes into the darkness until you come to a halt. You must decide what to do next.',
	image: "Images/burning_torch.jpg",
	options: [{
		text: 'Turn left',
		setState: {
			oneSword: false,
			halfSword: true
		},
		nextTextNode: 17
	}, {
		text: 'Turn right',
		setState: {
			oneSword: false,
			halfSword: true
		},
		nextTextNode: 16
	}]
}, { //Scene 15 -  Two swords
	id: 15,
	text: 'You have never fought with swords. No less with two. You are incredibly clumsy and you do not stand a chance. Youre dead.',
	image: "Images/philibert_scary.png",
	options: [{
		text: 'Start again',
		requiredState: (currentState) => currentState.twoSwords,
		setState: {
			goldenKey: false,
			twoSwords: false
		},
		nextTextNode: -1
	}]
}, { //Scene 16 - Turn right - The tomb
	id: 16,
	text: 'You reach a tomb and think about the last riddle. Its his tomb..You open it and find thousands of goldcoins but no body. You hear his voice coming closer and closer..You have two choices: Fill pockets with gold or run',
	image: "Images/philibert_death.jpg",
	options: [{
		text: 'Fill pockets',
		setState: {
			goldenKey: false,
			twoSwords: false,
			goldCoins: true
		},
		nextTextNode: 20
	}, {
		text: 'You run',
		setState: {
			goldenKey: true
		},
		nextTextNode: 20
	}]
}, { //Scene 17 - Turn left - Dead end
	id: 17,
	text: 'You have reached a dead end.',
	image: "Images/dead_end.jpg",
	options: [{
		text: 'Turn back',
		nextTextNode: 14
	}]
}, { //Scene 20 - The door
	id: 20,
	text: 'You run and see a door from far. His voice is getting closer..You get stressed. If you chose to keep your key you can now use it.',
	image: "Images/dark_cell.jpg",
	options: [{
		text: 'Drop your half sword and open with key',
		requiredState: (currentState) => currentState.goldenKey,
		setState: {
			halfSword: false,
			goldenKey: false,
			goldCoin: true
		},
		nextTextNode: 22
	}, {
		text: 'You try to open it without',
		requiredState: (currentState) => currentState.goldCoins,
		nextTextNode: 21
	}]
}, { //Scene 20 - Exit
	id: 22,
	text: 'The celldoor leads to a hallway and then..exit. You are lucky to have survived. You made the right choices and live to tell the tale of Philibert Ghost...As a thank you, the Catacomb provides you with one goldcoin.',
	image: "Images/exit_catacombs.jpg",
	options: [{
		text: 'EXIT',
		setState: {
			goldenKey: false
		},
		nextTextNode: -1
	}]
}, { //Scene 21 - Death
	id: 21,
	text: 'Greed is never flattering. Not taking the key with you has turned out to be the last thing you would regret. You turn around, and there he is.' + '\r\n' + 'Youre DEAD.',
	image: "Images/scary_death.jpg",
	options: [{
		text: 'Play again',
		setState: {
			goldenCoins: false
		},
		nextTextNode: -1
	}]
}]
//Start the game when the script is loaded
startGame()
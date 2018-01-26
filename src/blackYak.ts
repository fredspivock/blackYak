import { Deck } from '../node_modules/hearts/hearts';
import { Card } from '../node_modules/hearts/card/card';
let deck = new Deck(1);

let hand: Card[] = deck.draw(2);

function speak(msg: string) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
}

function readCardHand(hand: Card[]) {
    let msg = 'You have a';
    let i = 1;
    hand.map((card)=> {
        msg += card.cardString;
        msg += i < hand.length ? (i === hand.length - 1 ? 'and a ' : ' a ') : '';
        i++
    });

    return msg;
}

let commands = {
    '(could)(may)(you)(please)(dealer) tell me my hand (*word)': () => {
        speak(readCardHand(hand));
    },
    '(could)(please)(may)(you)(please)(dealer) hit me (*word)': (word: string) => {
        let card = deck.draw(1);
        console.log(word);
        hand.push(...card);

        speak(readCardHand(hand));
    },
    'thank you (*word)': () => {
        speak('You\'re welcome');
    }
    ,'thanks (*word)': () => {
        speak('no problem');
    }
};


// Add our commands to annyang
window.annyang.addCommands(commands);
window.annyang.start();

window.annyang.addCallback('end', () => {
    console.log('end');
    window.annyang.start();
});

window.annyang.addCallback('error', function() {
    console.log('There was an error in Annyang!');
});
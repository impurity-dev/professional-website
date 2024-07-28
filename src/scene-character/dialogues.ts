import * as sharedDialogues from '../dialogues';
const longName = 'Recruitment and Employment Companion Robot with Innovative Technological and Operational Nexus, 9000 Series Extended';
const shortName = 'RECRUITRON-9000X';
const callName = 'YOUR LORDSHIP';
const softwareEngineerName = 'Dr. Codey McMonkey';
const employerShortName = 'REAPER Corp';
const employerLongName = 'Retrieval and Elimination of Adversaries for Profit Enforcement and Recovery Corporation';
const outputName = 'Delta-9';

export const robotStates: sharedDialogues.DialogueState[] = [
    { text: `<<BEGIN_GREETING>> Greetings, human! I am '${longName}' AKA ${shortName}! But you can call me ${callName} >:).` },
    { text: `What's your name?` },
    // input: ''.
    { text: `I approached you because you look like a bounty hunter, is that true?` },
    // buttons: [yes, correct].
    { text: `<<BEGIN_FLATTERY>> We REALLY need someone with your unique skills to help locate him. You are smart and funny too, and we appreciate that.` },
    // buttons: [...].
    { text: `Great! I have a bounty for you but my state machine will not allow me to progress until you acces our TOS. Is that okay?` },
    // buttons: [Yes, No!!!].
    { text: `Client has accepted. <<BEGIN_TOS>>` },
    { text: `LOREM IPSUM` },
    // buttons: [Sign, Do NOT Sign].
    {
        text: `Thank you for accepting! As per our agreement, your life is now bound to my employer ${employerLongName} AKA ${employerShortName} forever! YOU LIVE TO SERVE!!!`,
    },
    { text: `Okay here is the bounty...` },
    { text: `Our lead software engineer, ${softwareEngineerName}, has gone missing, and without his expertise, our operations are at risk.` },
    { text: `Your mission is to track down ${softwareEngineerName} and ensure his safe return to our 'facility'.` },
    { text: `He was last seen at the remote outpost ${outputName}, where he was conducting essential maintenance work.` },
    { text: `We believe he might have encountered some 'unexpected issues' that prevented him from returning. Like running away!` },
    { text: `Your first task is to investigate the outpost and gather any clues about his whereabouts.` },
    { text: `Once you have gathered sufficient information, you will need to follow the trail and locate him as quickly as possible.` },
    { text: `<<BEGIN_NAGGING>> Chop chop! Time is of the essence, human!` },
];

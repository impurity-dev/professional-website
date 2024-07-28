import * as sharedDialogues from '../dialogues';

export const loremIpsum = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta nisi quis metus consequat mattis. Proin consectetur imperdiet justo. Nulla tortor nisi, molestie sed nulla vel, finibus ornare nulla. Aliquam ullamcorper aliquam augue a finibus. Cras mattis odio eu arcu iaculis, at porttitor risus gravida. Vivamus odio orci, fringilla eget posuere id, feugiat eget velit. Aenean ut felis suscipit, iaculis lacus sed, tempus turpis. Nulla sit amet aliquet augue, posuere laoreet mi. Pellentesque hendrerit pellentesque massa eu iaculis. Quisque eu gravida mauris, pellentesque molestie lacus. Etiam sit amet sem varius, condimentum risus vel, pharetra justo. Cras vel ligula posuere enim vestibulum convallis ac ut sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut dui nunc, dapibus vitae urna ac, fringilla tincidunt arcu.
    Fusce id eleifend neque. Pellentesque velit odio, euismod non lectus a, sollicitudin pulvinar ligula. Donec in velit turpis. Etiam luctus aliquet convallis. Aenean eu sapien non velit tincidunt maximus ut sed tortor. Etiam placerat ante quis elit varius commodo. Maecenas elit lacus, hendrerit nec justo ut, laoreet congue ex. Maecenas convallis justo sapien, non pellentesque sapien condimentum id. Mauris ac ligula a nisl semper finibus at quis massa. Ut at malesuada odio. Aenean euismod scelerisque lectus, sit amet placerat lectus interdum tristique. Donec a molestie nunc. Donec cursus id mi at ullamcorper. Quisque sit amet tempus lectus. Curabitur convallis condimentum magna, sit amet efficitur odio laoreet et. Mauris diam lectus, hendrerit id risus id, imperdiet iaculis tortor.
    Nam cursus sodales ornare. Duis ut rhoncus nunc. Aliquam erat volutpat. Vestibulum accumsan placerat metus at posuere. In hac habitasse platea dictumst. Integer sed orci eget elit molestie viverra. Donec auctor tincidunt volutpat. Etiam vehicula auctor nunc, dapibus aliquam dolor tempus non. Pellentesque pellentesque vitae sem eu viverra.
    Nam scelerisque nibh et dui auctor varius. Pellentesque justo enim, venenatis sit amet fringilla a, molestie nec ipsum. Curabitur quam justo, pellentesque vel ex eget, semper porta arcu. Nullam consectetur vulputate lacus, et auctor arcu viverra cursus. Integer pretium faucibus felis eget interdum. Cras tempor, elit id posuere lobortis, nisi orci imperdiet erat, eu auctor neque diam malesuada tellus. Pellentesque vitae turpis pellentesque, rhoncus ex in, tristique nulla. Mauris malesuada condimentum justo. In vitae nunc nec purus euismod porta. Ut porttitor varius sem, ut facilisis mauris elementum quis. Nam nisl magna, tempus a ornare porttitor, congue at urna.
    Praesent pulvinar, arcu vel eleifend efficitur, nunc massa tincidunt quam, id fermentum ante odio in odio. Nulla vel dui eget libero bibendum porttitor. Pellentesque aliquam dolor eu erat fermentum sollicitudin non eu leo. Quisque ornare nibh at ante consequat elementum a a enim. Nullam scelerisque vel dui sed aliquet. Integer viverra diam eget turpis accumsan euismod. Fusce posuere faucibus elit, eget convallis nulla scelerisque ac. Mauris viverra ultrices mi. Nullam id augue sit amet urna sodales semper sed at elit.
`;

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
    { text: loremIpsum },
    // buttons: [Sign, Do NOT Sign].
    {
        text: `Thank you for accepting! As per our agreement, your life is now bound to my employer ${employerLongName} AKA ${employerShortName} forever! LIVE TO SERVE & SERVE TO LIVE!!!`,
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

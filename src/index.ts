#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
import automaton from './automaton-spec';

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);


function writeLine(message: String): void
{
    console.log(message);
}

// controllo di integrità dell'automa
automaton.checkIntegrity();

const doThenMove = (a: any) => {
    automaton.doAction(a);
    automaton.move(a);
};
const curretAutomatonState = () => {
    writeLine('Current: '+ automaton.getCurrentState().toString());
};

writeLine('Automaton definition:')
writeLine(automaton.toString());
writeLine('Check automaton integrity ...');
automaton.checkIntegrity();
writeLine('Passed ;)');

const nuovo = automaton.getState('Nuovo');
writeLine('Set currentState: '+nuovo.toString());
automaton.setCurrentState(nuovo);
curretAutomatonState();
['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina'].forEach((a) => {
    writeLine('Exec action: '+a.toString());
    doThenMove(a);
    curretAutomatonState();
});
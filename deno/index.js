import {
  Action,
  Automaton,
  State,
} from "@delbio/automata"

// States
class Nuovo extends State{}
class Cancellato extends State{}
class Pubblicabile extends State{}
class Pubblicato extends State{}

class Elimina extends Action{}
class Modifica extends Action{}
class Pubblica extends Action{}

let nuovo = new Nuovo()
let cancellato = new Cancellato()
let pubblicabile = new Pubblicabile()
let pubblicato = new Pubblicato()

nuovo.addAction(new Elimina(nuovo, cancellato))
nuovo.addAction(new Modifica(nuovo, pubblicabile))

pubblicabile.addAction(new Elimina(pubblicabile, cancellato))
pubblicabile.addAction(new Pubblica(pubblicabile, pubblicato))
pubblicabile.addAction(new Modifica(pubblicabile, pubblicabile))

pubblicato.addAction(new Modifica(pubblicato, pubblicabile))

let automaton = new Automaton()
for (let s of [nuovo, cancellato, pubblicabile, pubblicato]) {
  automaton.addState(s)
}
automaton.addEnd(cancellato)
automaton.setBegin(nuovo)


function writeLine(message) {
    console.log(message)
}

// controllo di integrità dell'automa
automaton.checkIntegrity()

const doThenMove = (a) => {
  automaton.doAction(a)
  automaton.move(a)
}
const curretAutomatonState = () => {
  writeLine('Current: '+ automaton.getCurrentState().toString())
}

writeLine('Automaton definition:')
writeLine(automaton.toString())
writeLine('Check automaton integrity ...')
automaton.checkIntegrity()
writeLine('Passed )')

const nuovo_s = automaton.getState('Nuovo')
writeLine('Set currentState: '+nuovo_s.toString())
automaton.setCurrentState(nuovo_s)
curretAutomatonState()

for (let a of ['Modifica', 'Pubblica', 'Modifica', 'Modifica', 'Elimina']) {
  writeLine('Exec action: '+a.toString())
  doThenMove(a)
  curretAutomatonState()
}

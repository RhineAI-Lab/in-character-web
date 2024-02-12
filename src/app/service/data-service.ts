import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Round from "@/app/service/class/round";
import {results} from "@/app/service/data/results";
import {resultsOpen} from "@/app/service/data/results-open";
import Stage, {StageType} from "@/app/service/class/stage";

export default class DataService {

  static data: {
    rounds: Round[],
    state: SessionState
  } = proxy({
    rounds: [
      Round.OverviewRound(),
      // Round.StartRound(),
    ],
    state: SessionState.Initial,
  })

  static config : {
    args: string[][],
    files: string[],
  } = proxy({
    args: [['ChatHaruhi', 'RoleLLM'], ['gpt-3.5', 'gpt-4'], ['interview', 'choose-gpt-3.5', 'choose-gpt-4'], ['0.25', '1', '2']],
    files: ['ayaka-zh.json', 'Dumbledore-en.json', 'Harry-en.json', 'haruhi-zh.json', 'Hermione-en.json', 'hutao-zh.json', 'Luna-en.json', 'Malfoy-en.json', 'McGonagall-en.json', 'raidenShogun-zh.json', 'Raj-en.json', 'Ron-en.json', 'Sheldon-en.json', 'Snape-en.json', 'wanderer-zh.json', 'zhongli-zh.json', 'Blair Waldorf-en.json', 'Gaston-en.json', 'James Bond-en.json', 'Jigsaw-en.json', 'Jim Morrison-en.json', 'John Keating-en.json', 'Klaus Mikaelson-en.json', 'Lestat de Lioncourt-en.json', 'Lucifer Morningstar-en.json', 'Michael Scott-en.json', 'Rorschach-en.json', 'Shrek-en.json', 'The Dude-en.json', 'Thor-en.json', 'Twilight Sparkle-en.json', 'Walt Kowalski-en.json', 'traveler-zh.json', 'Caesar-en.json']
  })


  static characters: any[] = []

  static loadFromResult() {
    for (const q of results) {
      let c = this.getCharacter(q['test_role'])
      c.questions.push({
        id: q['id'],
        question: q['question'],
        responseOpen: q['response_open'],
        responseClosed: q['response_closed'],
        factor: q['factor'],
      })
    }
    for (const ro of resultsOpen) {
      let c = this.getCharacter(ro['character'])
      c.result = ro
    }
    for (const c of this.characters) {
      // console.log(c)
      let round = Round.CharacterRound(
        c.name,
        this.makeStages(c),
      )
      this.data.rounds.push(round)
    }
  }

  static makeStages(character: any): Stage[] {
    let stages: Stage[] = [
      new Stage([], StageType.ChooseEI),
      new Stage([], StageType.ChooseSN),
      new Stage([], StageType.ChooseTF),
      new Stage([], StageType.ChoosePJ),
    ]
    let tps = ['E/I', 'S/N', 'T/F', 'P/J']
    for (const q of character.questions) {
      for (const tp of tps) {
        if (q.factor === tp) {
          stages[tps.indexOf(tp)].push(q)
        }
      }
    }
    if (character.result) {
      for (const i in tps) {
        stages[i].push(character.result[tps[i]])
      }
    }
    return stages
  }

  static getCharacter(name: string) {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].name === name) {
        return this.characters[i]
      }
    }
    let character = {
      name: name,
      questions: [],
      result: null,
    }
    this.characters.push(character)
    return character
  }

  static lastRound() {
    return this.data.rounds[this.data.rounds.length - 1]
  }

  static lastStage() {
    let stages = this.lastRound().stages
    return stages[stages.length - 1]
  }

}

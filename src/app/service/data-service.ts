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
    ],
    state: SessionState.Initial,
  })


  static characters: any[] = []

  static init() {
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
      let c = this.getCharacter(ro['test_role'])
      c.result = ro
    }
    for (const c of this.characters) {
      this.data.rounds.push(Round.CharacterRound(
        c.name,
        this.makeStages(c),
      ))
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
    for (const q of character.question) {
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

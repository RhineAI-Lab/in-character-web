import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Round from "@/app/service/class/round";
import Stage, {StageType} from "@/app/service/class/stage";
import {allow} from "@/app/service/data/results";
import {characters} from "@/app/service/data/characters";

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
  } = proxy({
    args: [
      allow.map(data => data.value),
      allow[0].list.map(data => data.value),
      allow[0].list[0].list.map(data => data.value),
      allow[0].list[0].list[0].list.map(data => data.value),
      allow[0].list[0].list[0].list[0].list.map(data => data.value),
      allow[0].list[0].list[0].list[0].list[0].list.map(data => data.value),
      allow[0].list[0].list[0].list[0].list[0].list[0].list.map(data => data),
    ],
  })

  static tps = ['E/I', 'S/N', 'T/F', 'P/J']

  static loadFromResult(data: any, file: string) {
    let name = file.split('.')[0]
    let avatar = name.split('-')[0]
    try {
      if (name.endsWith('-zh')) {
        name = characters[name]['alias'][characters[name]['alias'].length - 1]
      } else {
        name = characters[name]['alias'][0]
      }
    } catch (e) {}
    let stages: Stage[] = [
      new Stage([], StageType.ChooseEI),
      new Stage([], StageType.ChooseSN),
      new Stage([], StageType.ChooseTF),
      new Stage([], StageType.ChoosePJ),
      new Stage([], StageType.Summary),
    ]
    for(const fi in this.tps) {
      const factor = this.tps[fi]
      for (const group of data.dims[factor]['details']) {
        for (const q of group) {
          for (const response of q['responses']) {
            const message = {
              id: response['id'],
              question: response['question'],
              responseOpen: response['response_open'],
              responseClosed: response['response_closed'],
              factor: q['dim'],
              choice: q['choice'],
              score: q['score'],
              test_role: name,
              avatar: avatar
            }
            // console.log(q, message)
            stages[fi].push(message)
          }
        }
      }
    }
    let round = Round.CharacterRound(name, stages)
    this.data.rounds.push(round)
  }

  static lastRound() {
    return this.data.rounds[this.data.rounds.length - 1]
  }

  static lastStage() {
    let stages = this.lastRound().stages
    return stages[stages.length - 1]
  }

}

import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Round from "@/app/service/class/round";
import {resultsOpen} from "@/app/service/data/results-open";
import Stage, {StageType} from "@/app/service/class/stage";
import {allow} from "@/app/service/data/results";

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
    const name = file.split('.')[0]
    let stages: Stage[] = [
      new Stage([], StageType.ChooseEI),
      new Stage([], StageType.ChooseSN),
      new Stage([], StageType.ChooseTF),
      new Stage([], StageType.ChoosePJ),
    ]
    for(const fi in this.tps) {
      const factor = this.tps[fi]
      for (const group of data[factor]['details']) {
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

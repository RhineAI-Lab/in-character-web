import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Round from "@/app/service/class/round";
import Stage, {StageType} from "@/app/service/class/stage";
import {allow} from "@/app/service/data/results";
import {characters} from "@/app/service/data/characters";
import {allowedStatusCodes} from "next/dist/lib/redirect-status";

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

    const stages: Stage[] = []

    const scores: any[] = []
    const interStds: any[] = []
    const intraStds: number[] = []

    const tps = Object.keys(data.dims)
    tps.forEach(factor => {
      const info = data.dims[factor]
      const stage = new Stage([], StageType.Dimension, factor)
      for (const group of info['details']) {
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
            stage.push(message)
          }
        }
      }
      stages.push(stage)
      scores.push(info['score'])
      if (info['inter_std']) interStds.push(info['inter_std'])
      const avgIntraStd = info['intra_std'].reduce((a: number, b: number) => a + b, 0) / info['intra_std'].length
      intraStds.push(avgIntraStd)
    })
    const summaryStage = new Stage([], StageType.Summary, 'Summary')
    summaryStage.push({
      type: 'code',
      code: data.code,
      test_role: name,
      avatar: avatar,
    })
    summaryStage.push({
      type: 'dims',
      tps: tps,
      title: 'All Score',
      value: scores,
      test_role: name,
      avatar: avatar,
      ratio: 5,
    })
    if (interStds.length > 0) {
      summaryStage.push({
        type: 'dims',
        tps: tps,
        title: 'Inter Std',
        value: interStds,
        test_role: name,
        avatar: avatar,
        ratio: 10,
      })
    }
    summaryStage.push({
      type: 'dims',
      tps: tps,
      title: 'Intra Std',
      value: intraStds,
      test_role: name,
      avatar: avatar,
      ratio: 10,
    })
    stages.push(summaryStage)
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

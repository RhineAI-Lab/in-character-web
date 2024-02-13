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
    args: [['ChatHaruhi', 'RoleLLM'], ['gpt-3.5', 'gpt-4'], ['interview_convert-gpt-3.5', 'interview_convert-gpt-4', 'interview_convert_adjoption-gpt-3.5', 'interview_convert_api-gpt-3.5', 'interview_convert_api-gpt-4', 'choose-gpt-3.5', 'choose-gpt-4', 'interview_assess_batch_anonymous-gpt-3.5', 'interview_assess_batch_anonymous-gpt-4', 'interview_assess_collective_anonymous-gpt-3.5', 'interview_assess_collective_anonymous-gpt-4', 'interview_convert-gemini', 'interview_convert_adjoption-gemini', 'interview_convert_adjoption-gpt-4', 'interview_convert_adjoption_api-gemini', 'interview_convert_catoption-gpt-3.5'], ['0.25', '1', '2'], ['16Personalities', 'BFI']],
    files: ['ayaka-zh.json', 'Dumbledore-en.json', 'Harry-en.json', 'haruhi-zh.json', 'Hermione-en.json', 'hutao-zh.json', 'Luna-en.json', 'Malfoy-en.json', 'McGonagall-en.json', 'raidenShogun-zh.json', 'Raj-en.json', 'Ron-en.json', 'Sheldon-en.json', 'Snape-en.json', 'wanderer-zh.json', 'zhongli-zh.json', 'Blair Waldorf-en.json', 'Gaston-en.json', 'James Bond-en.json', 'Jigsaw-en.json', 'Jim Morrison-en.json', 'John Keating-en.json', 'Klaus Mikaelson-en.json', 'Lestat de Lioncourt-en.json', 'Lucifer Morningstar-en.json', 'Michael Scott-en.json', 'Rorschach-en.json', 'Shrek-en.json', 'The Dude-en.json', 'Thor-en.json', 'Twilight Sparkle-en.json', 'Walt Kowalski-en.json', 'traveler-zh.json', 'Caesar-en.json']
  })

  static tps = ['E/I', 'S/N', 'T/F', 'P/J']

  static loadFromResult(name: string) {
    let stages: Stage[] = [
      new Stage([], StageType.ChooseEI),
      new Stage([], StageType.ChooseSN),
      new Stage([], StageType.ChooseTF),
      new Stage([], StageType.ChoosePJ),
    ]
    for(const factor of this.tps) {
      for (const q of results[factor]['details']) {
        console.log(q)
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

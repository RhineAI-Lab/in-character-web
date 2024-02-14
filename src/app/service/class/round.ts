import Stage, {StageType} from "@/app/service/class/stage";
import StageConfig from "@/app/service/class/stage-config";

export default class Round {

  public finished: boolean = false
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.Unknown,
    public name: string = 'Unknown',
    public stageConfigs: StageConfig[] = [],
  ) {
  }

  getPageName(index: number): string {
    if (index < this.stageConfigs.length) {
      let name = this.stageConfigs[index].name
      if (name.length > 0) {
        return this.name + ' - ' + name
      }
    }
    return this.name
  }

  maxStageNumber() {
    return this.stageConfigs.length
  }

  isRoundOrSettlement(): boolean {
    return false
  }

  static OverviewRound(): Round {
    return new Round(
      [new Stage([], StageType.Start)],
      RoundType.Overview,
      'Overview',
      [StageConfig.Start()]
    )
  }

  static StartRound(): Round {
    return new Round(
      [new Stage([], StageType.Start)],
      RoundType.Start,
      'Start',
      [StageConfig.Start()]
    )
  }

  static CharacterRound(name: string = 'Character', stages: Stage[]): Round {
    return new Round(
      stages,
      RoundType.Character,
      name,
      [
        StageConfig.ChooseEI(),
        StageConfig.ChooseSN(),
        StageConfig.ChooseTF(),
        StageConfig.ChoosePJ(),
        StageConfig.Summary(),
      ]
    )
  }
}

export enum RoundType {
  Overview = 'Overview Round',
  Start = 'Start Round',
  Character = 'Character Round',
  Unknown = 'Unknown Round',
}

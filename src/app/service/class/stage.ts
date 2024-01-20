
export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.Unknown,
  ) {
  }

  push(message: any) {
    this.messages.push(message)
  }

  size(): number {
    return this.messages.length
  }

  get(index: number): any {
    return this.messages[index]
  }

  static create(type: string): Stage {
    type = type.trim().split(' ').map((item: string) => {
      return item[0].toUpperCase() + item.substring(1)
    }).join(' ')
    let stage =type == StageType.Overview ? new Stage([], StageType.Overview)
      : type == StageType.ChooseEI ? new Stage([], StageType.ChooseEI)
      : type == StageType.ChooseSN ? new Stage([], StageType.ChooseSN)
      : type == StageType.ChooseTF ? new Stage([], StageType.ChooseTF)
      : type == StageType.ChoosePJ ? new Stage([], StageType.ChoosePJ)
      : type == StageType.Summary ? new Stage([], StageType.Summary)
      : undefined
    if (stage) return stage
    console.warn('Unknown stage type: ' + type)
    return new Stage([], StageType.Unknown)
  }
}

export enum StageType {
  Overview = 'Overview Stage',

  ChooseEI = 'Choose EI Stage',
  ChooseSN = 'Choose SN Stage',
  ChooseTF = 'Choose TF Stage',
  ChoosePJ = 'Choose PJ Stage',
  Summary = 'Summary Stage',

  Unknown = 'Unknown Stage',
}


export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.Unknown,
    public title: string = '',
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
      : type == StageType.Dimension ? new Stage([], StageType.Dimension)
      : type == StageType.Summary ? new Stage([], StageType.Summary)
      : undefined
    if (stage) return stage
    console.warn('Unknown stage type: ' + type)
    return new Stage([], StageType.Unknown)
  }
}

export enum StageType {
  Overview = 'Overview Stage',
  Start = 'Start Stage',

  Dimension = 'Dimension Stage',
  Summary = 'Summary Stage',

  Unknown = 'Unknown Stage',
}


export default class StageConfig {

  constructor(
    public name: string,
    public title: string,
    public description: string,
    public cover: string,
    public shadow: boolean = false,
  ) {
  }

  static Overview(): StageConfig {
    return new StageConfig(
      '',
      'In Character',
      'Personality Assessments on Role-Playing Agents.',
      '/background/4.jpg'
    )
  }

  static Start(): StageConfig {
    return new StageConfig(
      '',
      'Select Experiment',
      'Select parameters to view the experiment results.',
      '/background/5.jpg'
    )
  }

  static ChooseEI(): StageConfig {
    return new StageConfig(
      'E/I',
      'E/I',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/2.jpg'
    )
  }

  static ChooseSN(): StageConfig {
    return new StageConfig(
      'S/N',
      'S/N',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/9.jpg'
    )
  }

  static ChooseTF(): StageConfig {
    return new StageConfig(
      'T/F',
      'T/F',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/8.png',
      true
    )
  }

  static ChoosePJ(): StageConfig {
    return new StageConfig(
      'P/J',
      'P/J',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/11.jpg'
    )
  }

  static Summary(): StageConfig {
    return new StageConfig(
      'Summary',
      'Summary',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/1.jpg'
    )
  }

}


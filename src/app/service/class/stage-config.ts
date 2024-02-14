
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
      'In Character',
      'Personality Assessments on Role-Playing Agents.',
      '/background/4.jpg'
    )
  }

  static ChooseEI(): StageConfig {
    return new StageConfig(
      'E/I',
      'E/I',
      'Extraversion (E) vs Introversion (I): Extraverts recharge by engaging with the external world and social interactions, while introverts gain energy from solitude and internal reflection.',
      '/background/2.jpg'
    )
  }

  static ChooseSN(): StageConfig {
    return new StageConfig(
      'S/N',
      'S/N',
      'Sensing (S) vs Intuition (N): Sensing individuals concentrate on current realities and practical details, while Intuitive individuals look towards future possibilities and abstract concepts.',
      '/background/9.jpg'
    )
  }

  static ChooseTF(): StageConfig {
    return new StageConfig(
      'T/F',
      'T/F',
      'Thinking (T) vs Feeling (F): Thinking individuals prioritize logic and efficiency in decision-making, while Feeling individuals value empathy and harmony, focusing on people\'s emotions and needs.',
      '/background/8.png',
      true
    )
  }

  static ChoosePJ(): StageConfig {
    return new StageConfig(
      'P/J',
      'P/J',
      'Perceiving (P) vs Judging (J): Perceivers (P) are open and flexible, preferring to explore and keep options open, while Judgers (J) are structured and goal-oriented, focusing on organization and planning.',
      '/background/11.jpg'
    )
  }

  static Summary(): StageConfig {
    return new StageConfig(
      'Summary',
      'Summary',
      'The comprehensive summary page of character MBTI score information.',
      '/background/1.jpg'
    )
  }

}


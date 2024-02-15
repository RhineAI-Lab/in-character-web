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

  static descriptions: any = {
    'E/I': 'Extraversion (E) vs Introversion (I): Extraverts recharge by engaging with the external world and social interactions, while introverts gain energy from solitude and internal reflection.',
    'S/N': 'Sensing (S) vs Intuition (N): Sensing individuals concentrate on current realities and practical details, while Intuitive individuals look towards future possibilities and abstract concepts.',
    'T/F': 'Thinking (T) vs Feeling (F): Thinking individuals prioritize logic and efficiency in decision-making, while Feeling individuals value empathy and harmony, focusing on people\'s emotions and needs.',
    'J/P': 'Judging (J) vs Perceiving (P): Judging individuals prefer structure and organization, while Perceiving individuals are more flexible and adaptable, preferring to keep their options open.',
    "Conscientiousness": "Conscientiousness reflects impulse control and goal-oriented behavior, distinguishing disciplined individuals through traits like self-discipline and thoughtful decision-making.",
    "Openness": "Openness in the Big Five Inventory signifies a preference for novelty, intellectual curiosity, and creative exploration over traditional, conventional thinking.",
    "Agreeableness": "Agreeableness measures an individual's warmth and kindness, highlighting cooperation and social harmony through traits like trust, altruism, and modesty, contrasting those with skepticism and self-interest.",
    "Extraversion": "Extraversion in the Big Five reflects one's social energy, from outgoing enthusiasm to reserved introspection, measured by interaction, stimulation needs, and joy.",
    "Neuroticism": "Neuroticism in the Big Five Inventory captures an individual's tendency towards emotional instability, marked by anxiety, anger, sadness, impulsiveness, and stress vulnerability, contrasting with the calm and resilience of low scorers.",
    'Summary': 'The comprehensive summary page of character result information.',
  }

  static CharacterRound(name: string = 'Character', stages: Stage[]): Round {
    const covers = ['2.jpg', '9.jpg', '8.png', '11.jpg']
    const configs = []
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]
      const cover = stage.title == 'Summary' ? '1.jpg' : covers[i % 4]
      configs.push(new StageConfig(
        stage.title,
        stage.title,
        this.descriptions[stage.title] ?? '',
        '/background/' + cover,
        cover == '8.png'
      ))
    }
    return new Round(
      stages,
      RoundType.Character,
      name,
      configs,
    )
  }
}

export enum RoundType {
  Overview = 'Overview Round',
  Start = 'Start Round',
  Character = 'Character Round',
  Unknown = 'Unknown Round',
}

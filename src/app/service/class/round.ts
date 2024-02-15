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
    "Conscientiousness": "Conscientiousness in the Big Five Inventory relates to impulse control, organization, and goal-directed behavior. It differentiates disciplined, reliable individuals from those who are disorganized. Key traits include self-control, delaying gratification, and avoiding impulsiveness, which can lead to negative outcomes.\nThe six facets of conscientiousness are:\n1. Competence: Capability and effectiveness.\n2. Order: Organization and methodical approach.\n3. Dutifulness: Moral adherence and reliability.\n4. Achievement Striving: Ambition and diligence.\n5. Self-Discipline: Task initiation and persistence.\n6. Deliberation: Thoughtful decision-making.\nThese facets contrast high scorers, demonstrating strong traits, with low scorers, showing opposite tendencies like disorganization and impulsivity.",
    "Openness": "Openness in the Big Five Inventory relates to a cognitive style that values exploration and appreciation of new experiences. It differentiates intellectually curious, creative individuals from those who are traditional and closed-minded. Openness involves a preference for abstract over concrete thinking and a tendency towards novelty rather than convention.\nThe six facets of openness are:\n1. Fantasy: Active imagination and vivid fantasy life.\n2. Aesthetics: Deep appreciation for art and beauty.\n3. Feelings: Sensitivity to, recognition, and valuing of one's own emotions.\n4. Actions: Willingness to try new experiences and embrace change.\n5. Ideas: Intellectual curiosity and openness to unconventional ideas.\n6. Values: Reexamination of social, political, and religious values, challenging tradition and authority.\nThese facets highlight a contrast between high scorers, who display strong openness traits, and low scorers, who exhibit more conventional, practical thinking.",
    "Agreeableness": "Agreeableness in the Big Five Inventory assesses an individual's likability and attitudes towards others, balancing compassion and sympathy with antagonism and distrust. It encapsulates a broad interpersonal orientation, emphasizing cooperation and social harmony.\nThe six facets of agreeableness are:\n1. Trust: Belief in others' honesty and good intentions.\n2. Straightforwardness: Frankness and sincerity, contrasting with manipulative tendencies.\n3. Altruism: Generosity and willingness to assist others.\n4. Compliance: Preference for harmony over conflict, with a tendency to be accommodating.\n5. Modesty: Humbleness and self-effacement, as opposed to arrogance.\n6. Tender-mindedness: Sympathy and concern for others, versus a more hardheaded and objective approach.\nHigh scorers in agreeableness are seen as good-natured, cooperative, and trusting, whereas low scorers may prioritize self-interest, be indifferent to others, and exhibit skepticism towards people's motives.",
    "Extraversion": "Extraversion in the Big Five Inventory measures the quantity and intensity of interpersonal interaction, need for stimulation, and capacity for joy, contrasting social, outgoing individuals with reserved, shy types. It's evaluated through interpersonal involvement and activity level.\nThe six facets of extraversion are:\n1. Warmth: Affection and friendliness, with high scorers enjoying close relationships.\n2. Gregariousness: Preference for company, with high scorers enjoying lively settings.\n3. Assertiveness: Social dominance, with high scorers often becoming leaders.\n4. Activity: Pace of life, with high scorers leading fast-paced, busy lives.\n5. Excitement Seeking: Craving for stimulation, with high scorers seeking thrills.\n6. Positive Emotions: Tendency to experience joy and optimism.\nExtraverted people are energetic, enjoy interaction, and often feel positive emotions. They are enthusiastic and seek excitement. Introverted individuals are quieter, cautious, and value solitude, often misunderstood as unfriendly or arrogant, but can be kind and approachable.",
    "Neuroticism": "Neuroticism, or Emotional Stability, in the Big Five Inventory, refers to tendencies towards anxiety, hostility, depression, self-consciousness, impulsiveness, and vulnerability. It contrasts individuals who are prone to emotional instability with those who are emotionally stable and less reactive to stress.\nThe six facets of neuroticism are:\n1. Anxiety: High levels indicate a tendency to worry and feel tense.\n2. Angry Hostility: Reflects the ease of experiencing anger and frustration.\n3. Depression: Measures the tendency to feel sadness, hopelessness, and loneliness.\n4. Self-Consciousness: Involves shyness and sensitivity to social scrutiny.\n5. Impulsiveness: Indicates difficulty in controlling cravings and urges.\n6. Vulnerability: Measures susceptibility to stress and difficulty coping.\nHigh scorers in neuroticism may experience more negative emotions like fear, anger, and sadness, and find it hard to cope with stress. Low scorers tend to be calmer, more relaxed, and emotionally stable, handling stress and social situations more effectively.",
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

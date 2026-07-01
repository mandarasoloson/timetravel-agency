import type { DestinationId } from './destinations'

export interface QuizOption {
  label: string
  scores: Partial<Record<DestinationId, number>>
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { label: 'Culturelle et artistique', scores: { 'florence-1504': 2 } },
      { label: 'Aventure et nature', scores: { cretace: 2 } },
      { label: 'Élégance et raffinement', scores: { 'paris-1889': 2 } },
    ],
  },
  {
    question: 'Votre période préférée ?',
    options: [
      { label: 'Histoire moderne (XIXe–XXe siècle)', scores: { 'paris-1889': 2 } },
      { label: 'Temps anciens et origines', scores: { cretace: 2 } },
      { label: 'Renaissance et classicisme', scores: { 'florence-1504': 2 } },
    ],
  },
  {
    question: 'Vous préférez :',
    options: [
      { label: "L'effervescence urbaine", scores: { 'paris-1889': 1 } },
      { label: 'La nature sauvage', scores: { cretace: 1 } },
      { label: "L'art et l'architecture", scores: { 'florence-1504': 1 } },
    ],
  },
  {
    question: 'Votre activité idéale :',
    options: [
      { label: 'Visiter des monuments', scores: { 'paris-1889': 1 } },
      { label: 'Observer la faune', scores: { cretace: 1 } },
      { label: 'Explorer des musées', scores: { 'florence-1504': 1 } },
    ],
  },
]

export const quizExplanations: Record<DestinationId, string[]> = {
  'paris-1889': [
    "Vous aimez l'élégance, l'effervescence urbaine et les grands rendez-vous historiques : Paris 1889 et son Exposition Universelle sont faits pour vous.",
    "Entre raffinement et modernité naissante, la Belle Époque parisienne correspond parfaitement à votre sensibilité.",
  ],
  cretace: [
    "Votre goût pour l'aventure et la nature brute vous mène tout droit vers le Crétacé, à la rencontre des géants disparus.",
    "Peu de destinations offrent une immersion aussi sauvage : le Crétacé répond à votre soif d'exploration.",
  ],
  'florence-1504': [
    "Passionné d'art et d'architecture, vous trouverez à Florence 1504 l'apogée de la Renaissance et le génie de Michel-Ange.",
    "Entre musées à ciel ouvert et classicisme absolu, Florence 1504 est le voyage qui vous ressemble.",
  ],
}

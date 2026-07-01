export type DestinationId = 'paris-1889' | 'cretace' | 'florence-1504'

export interface Destination {
  id: DestinationId
  name: string
  era: string
  tagline: string
  image: string
  price: string
  duration: string
  description: string
  highlights: string[]
  tags: string[]
  accent: string
}

export const destinations: Destination[] = [
  {
    id: 'paris-1889',
    name: 'Paris',
    era: '1889',
    tagline: 'La Belle Époque et l’Exposition Universelle',
    image: '/images/paris-1889.jpg',
    price: '4 890 €',
    duration: '5 jours / 4 nuits',
    description:
      'Foulez le pavé du Champ-de-Mars le jour de l’inauguration de la Tour Eiffel. Flânez entre les pavillons de l’Exposition Universelle, sirotez un chocolat chaud au Café de Paris et laissez-vous porter par l’effervescence d’une capitale qui invente le XXe siècle.',
    highlights: [
      'Accès VIP à l’inauguration de la Tour Eiffel',
      'Visite guidée de l’Exposition Universelle',
      'Dîner d’époque au Café de Paris',
      'Promenade en calèche sur les Champs-Élysées',
    ],
    tags: ['architecture', 'urbain', 'art', 'gastronomie'],
    accent: '#c9a86a',
  },
  {
    id: 'cretace',
    name: 'Crétacé',
    era: '-65 000 000',
    tagline: 'Sur les traces des géants disparus',
    image: '/images/cretace.jpg',
    price: '7 250 €',
    duration: '3 jours / 2 nuits',
    description:
      'Explorez une nature sauvage et primitive, à quelques mètres de troupeaux de Tricératops et de silhouettes de Brachiosaures à l’horizon. Une immersion totale dans un monde disparu, encadrée par nos guides paléo-explorateurs.',
    highlights: [
      'Safari photo à distance de sécurité garantie',
      'Camp d’observation blindé et climatisé',
      'Guide paléontologue spécialisé',
      'Combinaison de camouflage anti-détection',
    ],
    tags: ['nature', 'aventure', 'faune', 'exploration'],
    accent: '#7a9b6e',
  },
  {
    id: 'florence-1504',
    name: 'Florence',
    era: '1504',
    tagline: 'Au cœur de la Renaissance italienne',
    image: '/images/florence-1504.jpg',
    price: '5 490 €',
    duration: '4 jours / 3 nuits',
    description:
      'Assistez à l’installation du David de Michel-Ange sur la Piazza della Signoria, croisez les élèves de l’atelier de Léonard et arpentez les ruelles dorées au bord de l’Arno à l’heure où Florence invente l’art moderne.',
    highlights: [
      'Rencontre privée dans l’atelier de Michel-Ange',
      'Traversée du Ponte Vecchio au coucher du soleil',
      'Cours d’initiation à la fresque',
      'Banquet Renaissance au Palazzo Vecchio',
    ],
    tags: ['art', 'architecture', 'histoire', 'gastronomie'],
    accent: '#b5793f',
  },
]

export function getDestination(id: DestinationId): Destination {
  const found = destinations.find((d) => d.id === id)
  if (!found) throw new Error(`Unknown destination: ${id}`)
  return found
}

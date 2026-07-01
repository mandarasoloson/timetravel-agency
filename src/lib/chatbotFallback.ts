import { destinations } from '../data/destinations'

interface Rule {
  keywords: string[]
  reply: string
}

const rules: Rule[] = [
  {
    keywords: ['prix', 'tarif', 'coute', 'coûte', 'combien', 'budget'],
    reply: destinations
      .map((d) => `${d.name} (${d.era}) — ${d.price} pour ${d.duration}`)
      .join('\n')
      .concat(
        "\n\nCes tarifs incluent le transport temporel, l'hébergement et l'accompagnement par nos guides. Une destination vous intéresse en particulier ?"
      ),
  },
  {
    keywords: ['paris', '1889', 'tour eiffel', 'exposition'],
    reply:
      "Paris 1889 vous plonge dans la Belle Époque, le jour de l'inauguration de la Tour Eiffel et de l'Exposition Universelle. Comptez 4 890 € pour 5 jours / 4 nuits, calèches et Café de Paris inclus. Envie d'en savoir plus sur les inclusions ?",
  },
  {
    keywords: ['cretace', 'crétacé', 'dinosaure', 'dino'],
    reply:
      "Le Crétacé (-65 millions d'années) est notre expédition la plus sauvage : safari sécurisé à la rencontre de Tricératops et Brachiosaures. 7 250 € pour 3 jours / 2 nuits, guide paléontologue inclus. C'est une destination qui vous tente ?",
  },
  {
    keywords: ['florence', '1504', 'renaissance', 'michel-ange', 'michelange', 'david'],
    reply:
      "Florence 1504 vous fait vivre l'apogée de la Renaissance : installation du David, atelier de Michel-Ange, Ponte Vecchio au coucher du soleil. 5 490 € pour 4 jours / 3 nuits. Souhaitez-vous les détails du programme ?",
  },
  {
    keywords: ['conseil', 'recommand', 'choisir', 'quelle destination', 'quelle époque', 'quelle epoque'],
    reply:
      "Pour choisir, dites-moi ce que vous recherchez : l'élégance urbaine (Paris 1889), l'aventure sauvage (Crétacé) ou l'art et l'architecture (Florence 1504). Vous pouvez aussi faire notre quiz personnalisé juste au-dessus pour une recommandation sur mesure !",
  },
  {
    keywords: ['danger', 'sécur', 'securit', 'risque'],
    reply:
      "Nos capsules chronologiques respectent un protocole de sécurité strict validé par le Bureau de Régulation Temporelle. Aucun incident n'a été déploré depuis notre ouverture — vous voyagez toujours accompagné d'un guide expert.",
  },
  {
    keywords: ['annul', 'rembours'],
    reply:
      "Une annulation jusqu'à 30 jours avant le départ est remboursée à 100%. Passé ce délai, des frais dégressifs s'appliquent selon la proximité du départ.",
  },
  {
    keywords: ['reserv', 'réserv', 'book'],
    reply:
      "Vous pouvez réserver directement depuis la fiche d'une destination (bouton « Réserver cette expédition ») ou via notre formulaire de réservation plus bas sur la page. Quelle destination avez-vous en tête ?",
  },
  {
    keywords: ['bonjour', 'salut', 'hello', 'coucou'],
    reply:
      "Bonjour et bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. Paris 1889, le Crétacé ou Florence 1504 — quelle époque vous fait rêver ?",
  },
  {
    keywords: ['merci'],
    reply: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur nos expéditions temporelles.",
  },
]

const fallbackReply =
  "C'est une excellente question ! Je peux vous renseigner sur nos 3 destinations (Paris 1889, Crétacé, Florence 1504), leurs tarifs, ou vous aider à choisir via notre quiz personnalisé. Que souhaitez-vous savoir ?"

const DIACRITICS = /[̀-ͯ]/g

function strip(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(DIACRITICS, '')
}

export function getFallbackReply(userMessage: string): string {
  const normalized = strip(userMessage)

  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(strip(kw)))) {
      return rule.reply
    }
  }
  return fallbackReply
}

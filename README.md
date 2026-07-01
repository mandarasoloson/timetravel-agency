# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive (Paris 1889, Crétacé, Florence 1504),
créée dans le cadre du projet supervisé IA M1/M2 — Session 2 : Webapp & IA Agents.

**Auteur : Manda Rasoloson** — M1 Développement Mobile & IoT, Ynov Campus Paris.

## Stack technique

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** pour le design system (thème sombre, accents dorés)
- **Framer Motion** pour les animations (scroll reveal, hover, transitions)
- **Vercel Serverless Function** (`api/chat.js`, Edge runtime) comme proxy sécurisé vers l'API Groq
- **Groq API** (modèle `llama-3.3-70b-versatile`) pour l'agent conversationnel, avec repli
  local automatique si aucune clé n'est configurée

## Features implémentées

**Page d'accueil**
- Hero plein écran avec animation d'apparition du titre, dégradés et images des 3 époques
- Section "Agence" avec présentation et statistiques animées au scroll
- CTA vers la galerie de destinations et le quiz

**Galerie des destinations**
- 3 cards interactives (hover, zoom image) pour Paris 1889, Crétacé, Florence 1504
- Modale de détail par destination (description, points forts, tarif, durée)
- Visuels intégrés depuis `public/images/`

**Agent conversationnel**
- Widget de chat flottant en bas à droite (bulle → fenêtre de chat)
- Personnalité définie (conseiller passionné d'histoire, ton chaleureux et professionnel)
- Répond aux questions sur les destinations, les prix, la sécurité, les réservations
- Appelle l'API Groq via une fonction serverless (clé jamais exposée côté client)
- **Repli local automatique** (réponses par mots-clés) si l'API n'est pas configurée ou
  indisponible, afin que le chatbot fonctionne toujours, même sans clé

**FAQ**
- Section FAQ en accordéon (sécurité, annulation, remboursement, etc.)

**Quiz de recommandation personnalisée** (automatisation)
- 4 questions sur les préférences du voyageur
- Algorithme de scoring qui détermine la destination la plus adaptée
- Explication personnalisée générée dynamiquement à l'affichage du résultat

**Réservation**
- Formulaire (destination, nom, e-mail, date) avec validation côté client
- Pré-remplissage automatique de la destination choisie depuis une card ou le quiz
- Écran de confirmation récapitulatif

**UX / Animations**
- Fade-in progressif des sections au scroll (Framer Motion `whileInView`)
- Hover effects sur les cards, boutons et liens
- Transitions douces sur la modale, le quiz et le chat

## IA utilisées (transparence)

- **Code** : claude à partir de prompt
- **Chatbot** : modèle `llama-3.3-70b-versatile` via l'API Groq (gratuite), avec un système
  de repli local sans IA externe (règles par mots-clés) si aucune clé API n'est fournie
- **Visuels des destinations** : images générées par IA (session 1)

## Installation locale

```bash
cd timetravel-agency
npm install
npm run dev
```

L'app est disponible sur `http://localhost:5173`. Sans configuration supplémentaire, le
chatbot fonctionne déjà en **mode local** (réponses par mots-clés, sans IA externe).

### Activer le chatbot IA (Groq)

1. Créez un compte sur [console.groq.com](https://console.groq.com)
2. Allez dans **API Keys** → **Create API Key**, copiez la clé
3. Dupliquez `.env.example` en `.env.local` et renseignez :
   ```
   GROQ_API_KEY=votre_cle_ici
   ```
4. Pour tester la fonction serverless en local, utilisez la CLI Vercel :
   ```bash
   npm i -g vercel
   vercel dev
   ```
   (Avec `npm run dev` seul, la route `/api/chat` n'existe pas côté Vite : le chatbot
   bascule automatiquement en mode local, ce qui reste pleinement fonctionnel.)

## Déploiement (Vercel)

```bash
npm i -g vercel
vercel
```

Puis, dans le dashboard Vercel du projet : **Settings → Environment Variables**, ajoutez
`GROQ_API_KEY` avec votre clé. Redéployez pour activer le chatbot IA en production.

## Structure

```
timetravel-agency/
├── api/chat.js              # Fonction serverless (proxy Groq, clé API côté serveur)
├── public/images/           # Visuels des 3 destinations
├── src/
│   ├── components/          # Navbar, Hero, About, Destinations, Quiz, Reservation, Faq, Chatbot...
│   ├── data/                 # destinations.ts, quiz.ts, faq.ts
│   ├── lib/chatbotFallback.ts # Réponses locales de secours
│   └── App.tsx
```

## Prompts principaux utilisés

- *"Crée une landing page pour une agence de voyage temporel de luxe, thème sombre avec
  accents dorés, hero avec titre animé, galerie de 3 destinations (cards avec hover), style
  premium et élégant."*
- *"Ajoute un quiz de 4 questions qui recommande une destination selon les réponses, avec
  système de score et explication personnalisée du résultat."*
- *"Intègre un chatbot flottant en bas à droite, avec la personnalité suivante : conseiller
  TimeTravel Agency, passionné d'histoire, ton chaleureux et professionnel, connaît Paris
  1889, le Crétacé et Florence 1504. Utilise l'API Groq via une fonction serverless pour ne
  jamais exposer la clé API côté client, avec un repli local si l'API est indisponible."*
- *"Ajoute des animations subtiles au scroll (fade-in), des hover effects sur les cards, et
  des transitions douces sur la modale et le chat, avec Framer Motion."*

## Crédits

- Visuels générés par IA (session 1 du projet)
- Icônes : SVG inline, dessinées à la main pour ce projet
- Polices : [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) et
  [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- API IA : [Groq](https://groq.com) (modèles open source hébergés)

## Réflexion sur le processus

Le plus grand arbitrage a été la sécurité de la clé API : plutôt que d'appeler Groq
directement depuis le navigateur (ce qui exposerait la clé), le chatbot passe par une
fonction serverless Vercel. Pour garantir que la démo fonctionne dans tous les cas — y
compris sans clé configurée ou en développement local sans `vercel dev` — un système de
repli par mots-clés a été ajouté côté client, invisible pour l'utilisateur si l'API
répond correctement.

## Licence

Projet pédagogique — M1 Développement Mobile & IoT, Ynov Campus Paris. Agence fictive,
projet réalisé individuellement par Manda Rasoloson.

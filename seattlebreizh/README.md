# Seattle'Breizh — Site vitrine statique

Site vitrine professionnel en français pour **Seattle'Breizh**, restaurant de comfort food américaine vintage à Lorient. Le projet est 100 % statique (HTML/CSS/JS), prêt à être déployé sur n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel, etc.).

## Pages incluses

- **`index.html`** — Page d'accueil : héros, univers, plats phares, témoignages, bandeau CTA
- **`a-propos.html`** — Histoire du restaurant, valeurs et galerie photo
- **`menu.html`** — Carte complète avec navigation par catégories (burgers, signatures, accompagnements, desserts)
- **`contact.html`** — Formulaire de réservation, infos pratiques et carte Google Maps

## Fonctionnalités clés

- **Design vintage Americana** : palette crème/espresso/bordeaux/moutarde, typographies Libre Baskerville + Bebas Neue + Source Sans 3
- **Navigation responsive** avec hamburger, bouton « Réserver » persistant et menu mobile
- **Composants partagés** : header et footer injectés via `partials/` + `js/layout.js`
- **Menu interactif** : barre de catégories sticky avec surbrillance au scroll (`js/menu-nav.js`)
- **Formulaire de réservation** : branché sur Formspree (remplacer `yourformid` par votre ID)

## Arborescence

```
/
├─ index.html
├─ a-propos.html
├─ menu.html
├─ contact.html
├─ style.css              # Point d'entrée CSS (@import)
├─ css/
│  ├─ variables.css       # Design tokens
│  ├─ base.css            # Reset, typographie
│  ├─ components.css      # Header, footer, cartes, formulaires
│  └─ pages.css           # Layouts spécifiques par page
├─ js/
│  ├─ layout.js           # Injection header/footer
│  ├─ nav.js              # Menu mobile
│  └─ menu-nav.js         # Navigation catégories menu
├─ partials/
│  ├─ header.html
│  └─ footer.html
└─ images/                # Visuels (héros, plats, favicon, etc.)
```

## Prise en main

1. **Cloner ou télécharger** le dépôt :
   ```bash
   git clone <url-du-depot>
   cd SeattleKitchen
   ```
2. **Lancer en local** avec un serveur HTTP (requis pour les partials) :
   ```bash
   npx serve .
   ```
   Ou via l'extension Live Server de VS Code.
3. **Personnaliser** :
   - Textes et prix dans les fichiers HTML
   - Couleurs et polices dans `css/variables.css`
   - Remplacez `yourformid` dans `contact.html` par votre ID Formspree
   - Mettez vos propres images dans `images/`

## Déploiement

- **GitHub Pages** : poussez la branche principale, activez Pages sur le dossier racine
- **Netlify/Vercel** : importez le dépôt, déploiement statique sans build

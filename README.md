# Circle Front-end

Ce projet constitue la partie front-end de l'application Circle.

### Installation

- **Cloner le dépôt depuis GitHub :**
  Vous pouvez cloner le dépôt en utilisant la commande `git clone https://github.com/flavienderoy/circle-frontend.git`.

- **Installer les dépendances avec npm :**
  Utilisez la commande `npm install` pour installer toutes les dépendances nécessaires au projet.

- **Configurer le fichier .env :**
  Assurez-vous de bien configurer le fichier `.env` en fonction de votre réseau ou des paramètres requis par l'application.

- **Lancer l'application :**
  Une fois les dépendances installées et le fichier `.env` configuré, lancez l'application avec la commande `npm start`.

- **Utilisation :**
  Assurez-vous d'avoir configuré et lancé correctement la partie back-end de l'application.
  Vous pouvez maintenant accéder à l'interface utilisateur en ouvrant votre navigateur et en visitant http://localhost:3000 ou le port que vous aurez choisi.
  Explorez les différentes fonctionnalités de l'application en naviguant à travers les différentes pages et en interagissant avec les composants.

- **Suite**
Une fois que la partie Front-End fonctionne correctement et est connectée à la partie Back-End, vous pourrez commencer à utiliser pleinement l'application Circle.

- **Problèmes de CORS :**
  Si vous rencontrez des problèmes de CORS, vous pouvez ajouter les configurations suivantes dans le fichier `server.js` :
  ```javascript
  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': [ 'sessionId', 'Content-Type' ],
    'exposedHeaders': [ 'sessionId' ],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));
  ```

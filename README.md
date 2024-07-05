# Will You Rather? - The Ultimate Decision-Making Game

## Description

"Will You Rather?" est une application de vote basée sur la blockchain Ethereum. Elle permet aux utilisateurs de répondre à des questions "Would you rather?" en votant pour leur option préférée de manière sécurisée et transparente. L'application utilise des technologies web modernes pour offrir une expérience utilisateur fluide et engageante, avec des statistiques de votes en temps réel.

## Table des Matières

1. [Fonctionnalités](#fonctionnalités)
2. [Architecture](#architecture)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Utilisation](#utilisation)
6. [Améliorations futures](#améliorations-futures)

## Fonctionnalités

- **Système de vote sécurisé** : Utilisation de la blockchain Ethereum pour enregistrer les votes de manière immuable.
- **Interface utilisateur interactive** : Conçue avec HTML, CSS et JavaScript.
- **Statistiques en temps réel** : Affichage des pourcentages de votes pour chaque option.
- **Navigation entre les questions** : Les utilisateurs peuvent passer aux questions suivantes ou précédentes avec des boutons de navigation.

## Architecture

L'architecture de l'application est décentralisée et repose sur la blockchain Ethereum :

1. **Front-end** :

   - Développé avec HTML, CSS et JavaScript.
   - Utilisation de Web3.js pour interagir avec la blockchain.

2. **Contrat intelligent** :

   - Écrit en Solidity et déployé sur la blockchain Ethereum.
   - Gère l'enregistrement des votes et l'affichage des résultats.

3. **Portefeuille Ethereum** :
   - Utilisation de MetaMask pour permettre aux utilisateurs de se connecter et de voter de manière sécurisée.

## Prérequis

- **Node.js** : Assurez-vous d'avoir Node.js installé sur votre machine.
- **MetaMask** : Extension de navigateur pour interagir avec la blockchain Ethereum.

## Installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/votre-utilisateur/will-you-rather.git
   cd will-you-rather
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Déployez le contrat intelligent** :

   - Ouvrez Remix IDE ([https://remix.ethereum.org/](https://remix.ethereum.org/)).
   - Créez un nouveau fichier `WillYouRather.sol` et copiez le code du contrat.
   - Compilez et déployez le contrat sur la blockchain Ethereum.
   - Notez l'adresse du contrat déployé.

4. **Configurez l'application** :
   - Ouvrez `index.html`.
   - Remplacez `YOUR_CONTRACT_ADDRESS` par l'adresse du contrat déployé.
   - Remplacez `YOUR_CONTRACT_ABI` par l'ABI du contrat.

## Utilisation

1. **Ouvrez l'application** :
   - Ouvrez `index.html` dans un navigateur.
2. **Connectez MetaMask** :

   - Connectez-vous à MetaMask et sélectionnez le réseau approprié.

3. **Votez** :

   - Répondez aux questions en cliquant sur l'option de votre choix.
   - Les votes seront enregistrés sur la blockchain et les statistiques seront mises à jour en temps réel.

4. **Navigation** :
   - Utilisez les boutons "Next Question" et "Previous Question" pour naviguer entre les questions.
   - À la fin des questions, le bouton "Next Question" se transformera en "End of Voting".

## Améliorations futures

- **Ajout de plus de questions et catégories** : Diversifier les questions pour maintenir l'intérêt des utilisateurs.
- **Optimisation de l'interface utilisateur** : Rendre l'interface encore plus intuitive et attractive.
- **Fonctionnalités supplémentaires** : Ajouter des options comme la création de questions personnalisées par les utilisateurs et des discussions sur les choix.
- **Support multi-plateforme** : Optimiser l'application pour une utilisation sur différents appareils, y compris les mobiles.

## Conclusion

"Will You Rather?" est une application innovante qui combine l'interactivité des jeux de questions-réponses avec la sécurité et la transparence de la blockchain. Ce projet montre comment les technologies blockchain peuvent être utilisées pour créer des applications décentralisées et fiables. Nous sommes enthousiastes à l'idée de continuer à améliorer cette application pour offrir une expérience utilisateur toujours plus riche et engageante.

Merci d'avoir utilisé "Will You Rather?". Pour toute question ou contribution, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.

---

### Contact

- **Développeur** : Yosr Trabelsi et Sinthy Nimalaratnam
- **Email** : [yosr.tabelsi@ecole-hexagone.com sinthy.nimalaratnam@ecole-hexagone.com]
- **GitHub** : [https://github.com/yosr88][https://github.com/sinthy-N]

```

```

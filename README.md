# Outil de Connexion Firebase

## Description du projet

Cet outil est une interface web simple conçue pour faciliter le processus de connexion à Firebase. Il est particulièrement utile pour les développeurs qui ont besoin de tester rapidement des informations d'identification, de vérifier l'état d'une connexion ou de récupérer un ID Token pour des tests d'API.

Le projet est composé de trois fichiers :
* `index.html` : La structure de l'interface utilisateur.
* `style.css` : La mise en page et l'esthétique, avec un thème sombre, moderne et tech.
* `script.js` : La logique de l'application, gérant la connexion à Firebase, l'affichage des informations et la gestion des événements.

---

## Fonctionnalités

* **Connexion sécurisée :** Permet de se connecter à votre projet Firebase en utilisant un e-mail et un mot de passe.
* **Indicateurs visuels :** Un système de points et de texte qui indique en temps réel l'état de la connexion (connecté/déconnecté) et la validité de l'ID Token (valide/invalide).
* **Récupération de l'ID Token :** Affiche l'ID Token de l'utilisateur une fois la connexion réussie.
* **Validité du token :** Calcule et affiche la période de validité de l'ID Token (date de création et date d'expiration).
* **Actualisation du token :** Un bouton "Actualiser le token" permet de générer un nouvel ID Token sans avoir à se déconnecter et se reconnecter.

---

## Prérequis

Pour utiliser cet outil, vous devez avoir un projet Firebase configuré avec l'authentification par e-mail/mot de passe activée.

---

## Comment utiliser l'outil

1.  **Copiez les fichiers :** Assurez-vous d'avoir les trois fichiers (`index.html`, `style.css`, et `script.js`) dans le même répertoire.
2.  **Ouvrez `index.html` :** Double-cliquez sur le fichier `index.html` pour l'ouvrir dans votre navigateur web.
3.  **Collez la configuration :** Dans le champ "Coller votre firebaseConfig ici", copiez et collez l'objet de configuration de votre projet Firebase. Vous pouvez le trouver dans les paramètres de votre projet sur la console Firebase.
    ```json
    {
      "apiKey": "votre-api-key",
      "authDomain": "votre-domaine.firebaseapp.com",
      "projectId": "votre-project-id",
      "storageBucket": "votre-bucket.appspot.com",
      "messagingSenderId": "votre-sender-id",
      "appId": "votre-app-id"
    }
    ```
4.  **Entrez vos identifiants :** Saisissez l'e-mail et le mot de passe d'un utilisateur déjà enregistré dans votre projet Firebase Auth.
5.  **Cliquez sur "Se connecter" :** Le système tentera de vous connecter et affichera le résultat, l'état de la connexion, et les informations sur le token.

---

## Contribution et Amélioration

Ce projet est un outil simple et léger. Il est ouvert aux contributions et aux améliorations. Si vous souhaitez l'améliorer, n'hésitez pas à :
* Soumettre une **Pull Request** avec vos modifications.
* Signaler un **problème** ou proposer de nouvelles fonctionnalités via la page Issues du dépôt.

Les améliorations possibles pourraient inclure la prise en charge d'autres méthodes d'authentification (Google, GitHub, etc.) ou une gestion plus robuste des erreurs.

---

## Licence

Ce projet est sous licence **MIT**. Cela signifie que vous êtes libre de l'utiliser, de le modifier et de le distribuer, même dans des projets commerciaux, à condition de conserver la mention de droit d'auteur et la clause de non-responsabilité.

Une copie de la licence est incluse dans le dépôt du projet.

---

## Auteur

Ce projet a été initialement créé par **Daniel RAMAZANI**.
# 🚀 Roadmap & Améliorations Futures : Serenity

Félicitations pour le socle actuel ! Serenity est déjà une application sécurisée, connectée à une base de données de production et dotée d'un Onboarding de qualité médicale. 

Voici la liste exhaustive de tout ce que nous pouvons faire pour transformer cette excellente application en un véritable Dispositif Médical intelligent, indispensable au quotidien.

---

## 📸 1. L'Intelligence Artificielle "Ordonnance Magique"
* **Aujourd'hui** : Le composant `scan-prescription.vue` fait semblant de lire l'ordonnance.
* **Demain** : On intègre l'API **Google Cloud Vision** (OCR) couplée à un Modèle Langage (Gemini).
* **Le Wow Effect** : L'utilisateur prend en photo une ordonnance dactylographiée. Supabase lit l'image, l'IA nettoie les fautes, comprend les termes complexes et pré-remplit instantanément son pilulier avec les médicaments exacts piochés dans notre base BDPM, sans aucune saisie manuelle.

---

## 🗓️ 2. Le Chef d'Orchestre : La "Timeline" Intelligente
* **Aujourd'hui** : L'écran *Ma Journée* (`timeline.vue`) est en attente d'implémentation.
* **Demain** : Un algorithme croise la base `medications` avec les `symptom_logs` et des événements de calendrier.
* **Le Wow Effect** : L'interface génère une *Timeline* dynamique heure par heure.
  - *"08:00 - Prendre Lévothyrox (à jeun)"* (Bouton pour valider la prise).
  - *"12:00 - Dîner + 1x Dafalgan 500"*
  - *"14:00 - Séance APA (Yoga) - 30 min"*
  - À la fin de la journée, si l'utilisateur n'a pas coché ses cases, on envoie une notification push pour rappel.

---

## 🔔 3. Bouton SOS & Le Cercle de Soutien (Social Santé)
* **Aujourd'hui** : L'écran `circle.vue` est une jolie maquette d'intentions.
* **Demain** : Implémenter le rôle "Proche Aidant" dans Supabase.
* **Le Wow Effect** : L'utilisateur principal peut inviter un membre de sa famille par email. Ce membre aura accès à une version "lecture seule" de Serenity. L'aidant recevra un SMS automatique si le patient déclenche un gros pic de douleur dans l'application ou s'il appuie sur une nouvelle *Panic Button / Hotline Directe* présente sur le Dashboard.

---

## 📊 4. "Mon Bilan" : L'Export pour l'Hôpital (Data Viz)
* **Aujourd'hui** : Le suivi des symptômes est listé jour par jour de manière brute en bascules.
* **Demain** : Intégration de bibliothèques graphiques (`Chart.js` ou `Vue-ECharts`).
* **Le Wow Effect** : Une toute nouvelle page `Insights` qui affiche de superbes courbes : *Niveau de Douleur vs. Qualité de Sommeil sur les 30 derniers jours*. Et un bouton magique (Générer PDF) qui crée un rapport professionnel que le patient peut envoyer directement par email à son oncologue avant sa consultation.

---

## 🤖 5. Alerte d'Interactions Médicamenteuses (Check Sécurité)
* **Aujourd'hui** : L'alerte rouge sur l'ajout manuel est affichée de manière aléatoire pour la démonstration.
* **Demain** : Se brancher sur la Base de Données "Theriaque" ou construire un prompt IA strict en arrière-plan.
* **Le Wow Effect** : Dès qu'un patient ajoute un médicament, le système vérifie instantanément tous les *autres* médicaments de sa liste. S'il tente d'ajouter du Millepertuis alors qu'il est sous Chimiothérapie orale, l'écran devient rouge avec une alerte stricte : "⚠️ Interaction Dangereuse Détectée - Risque de baisse d'efficacité de votre traitement."

---

## 🎨 6. Expérience Utilisateur (UX) & Gamification Bienveillante
- **Mode PWA Complet** : Configurer Nuxt pour que le site soit installable sur l'écran d'accueil des téléphones.
- **Système de Badges de Motivation** : Valoriser la persévérance. *(Ex: "7 jours parfaits : Tous les médicaments pris à l'heure, Bravo !")*.
- **Contenu Dynamique Bien-être** : Remplacer les pages statiques sport/relaxation par des intégrations d'exercices vidéos réels.

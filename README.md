# Test technique - Winamax - Yanis Sahnoune

![Yarn](https://img.shields.io/badge/Package_Manager-Yarn-red?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-v20.15.0-orange?style=flat-square)
![Run Project](https://img.shields.io/badge/Run_Project-yarn_&&_yarn_dev-purple?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Atomic_Design-pink?style=flat-square)
![Run Test](https://img.shields.io/badge/Run_Test-yarn_&&_yarn_test-green?style=flat-square)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen?style=flat)

---

## 🚀 Installation et Exécution

### **Pré-requis**

- **Node.js** version **20.15.0**
- **Yarn** comme gestionnaire de paquets

### **Installation**

```bash
yarn
```

### **Démarrer le projet**

```bash
yarn dev
```

### **Lancer les tests**

```bash
yarn test
```

---

## 📁 Architecture

Le projet utilise le **pattern Atomic Design** pour la structure des composants front-end.

---

## 📝 Description Fonctionnelle

### Fonctionnalités attendues

1. **Filtrage des résultats :**

   - L'utilisateur peut trouver des combinaisons de **3 tournois** (triplets) dont le **buy-in total** est compris entre **X** et **Y**.
   - Les tournois ne peuvent pas être mis en triplets s'ils commencent à **moins d'1h d'intervalle**.

2. **Affichage des résultats :**

   - Les triplets sont affichés par groupe de **3 tournois**.
   - Les résultats sont **triés** par **buy-in total croissant**.

3. **Optimisation de l'algorithme :**
   - L'algorithme doit être **optimisé** pour les performances et la rapidité de traitement.

---

## ⚙️ Technologies Utilisées

- **Node.js** v20.15.0
- **Yarn** (Package Manager)
- **React** (Framework Front-end)
- **TypeScript** (Typage statique)
- **Jest** (Tests unitaires)

---

## 📊 Couverture des Tests

![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)

La couverture des tests est automatiquement mise à jour après chaque exécution des tests.

---

## 🛠️ Exécution des Tests et Mise à Jour du Badge

Pour générer la couverture des tests et mettre à jour automatiquement le badge :

```bash
yarn test --coverage && bash update-coverage-badge.sh
```

---

## 🚧 Optimisation à Venir

- **Amélioration des performances** pour les grands jeux de données.
- **Tests unitaires supplémentaires** pour les cas limites.
- **Optimisation UI/UX** pour une meilleure expérience utilisateur.

---

## 🧑‍💻 Auteur

**Yanis Sahnoune**
_Développeur Front-end_

---

## 📄 License

Ce projet est sous licence **MIT**.

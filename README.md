# Test technique - Winamax - Yanis Sahnoune

![Yarn](https://img.shields.io/badge/Package_Manager-Yarn-blue?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-v20.15.0-green?style=flat-square)
![Run Project](https://img.shields.io/badge/Run_Project-yarn_&&_yarn_dev-yellow?style=flat-square)
![Run Test](https://img.shields.io/badge/Run_Test-yarn_&&_yarn_test-yellowgreen?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Atomic_Design-orange?style=flat-square)

---

### Fonctionnalités implémentées :

- ✅ **Filtrer les 350 premiers résultats** : OK
- ✅ **Combinaisons de 3 tournois (triplets)** :
  - Buy-in total compris entre **X et Y**
  - Exclusion des tournois ayant moins d'1h d'intervalle entre leurs débuts
  - Affichage des résultats par **groupes de 3** tournois
  - Tri des résultats par **buy-in total croissant**
  - **Optimisation** de l'algorithme de détection des triplets

---

### 📋 Instructions pour exécuter le projet :

1. Assurez-vous d'avoir **Yarn** et **Node v20.15.0** installés.
2. Clonez le projet :
   ```bash
   git clone <URL_DU_PROJET>
   ```
3. Installez les dépendances :
   ```bash
   yarn
   ```
4. Lancez le projet :
   ```bash
   yarn dev
   ```

### 🧪 Instructions pour lancer les tests :

```bash
yarn test
```

---

### 🛠️ Architecture du Projet :

Le projet suit le **Pattern Architecture Atomic Design**, ce qui permet de construire une interface modulaire et réutilisable.

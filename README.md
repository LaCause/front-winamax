# Test technique - Winamax - Yanis Sahnoune

#### Package manager : Yarn

#### Node version : v20.15.0

#### Run project : yarn && yarn dev

#### Run test : yarn && yarn test

#### Pattern architecture front : Atomic Design

// Filtrer les 350 premiers résultats : OK
// partir des données des 350 premiers tournois présents sur la plateforme,
// - l'utilisateur aimerait trouver l'ensemble des combinaisons de 3 tournois (triplets), dont le buy-in total est compris entre X et Y.
// - Il n'est pas possible de mettre en triplet des tournois qui commencent à moins d'1h d'intervalle.
// - Les résultats doivent être affichés par groupes de 3 tournois et triés par buy-in total croissant. - L'algorithme de détection des triplets doit être optimisé."

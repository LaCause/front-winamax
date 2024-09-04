export const ReadMe = () => {
    return <>
    <section className="text-black container flex flex-col gap-y-4">
        <h1 className="mt-4">ReadMe</h1>
        <ul>
            <b>Travail éffecuté</b>
            <li>Architecture front - Atomic design</li>
            <li>Ajout de tailwind pour une gestion flexibles des différents composants</li>
        </ul>
        <ul>
            <b>Axes d'améliorations :</b>
            <li>Ajouter un linter pour la qualité de code et le couplé à son IDE pour un formatage auto à chaques update de fichier</li>
            <li>Ajouter i18n pour avoir des clé de traduction pour plusieurs pays</li>
            <li>Ajouter un fichier storybook sur chaques composants pour que les UI / UX puissent avoir un playground des différents composants créer</li>
            <li>Rendre les données persistantes entre vues</li>
            <li>Créer un interval pour update les données en temps réel</li>
            <li>Ajouter un darkmode</li>
            <li>Ajouter une lazy load pour charger les prochains résultats et gagner en performance au chargement de la page</li>
            <li>Écrire chaques composant pour qu'ils soit réutilisé comme par exemple : Title avec une props level pour savoir si c'est un h1 ou autres</li>
            <li>Créer un backend for frontend qui permettra de centralisé les requetes afin</li>
            <li>Créer un design system distant sous forme de package pour qu'il puisse etre utilisé à travers tout les différents projets en interne</li>
        </ul>
    </section>
    </>
}
Application mobile de gestion de bibliothèque: côté front-end

développeur: Nicolas TARTAGLIA

Les fonctionnalités :
-	Aucune personne non authentifiée ne doit pouvoir administrer la bibliothèque
-	Toute personne doit pouvoir faire des recherches d’objets et ajouter des commentaires sur des objets sans être authentifié
-	Un bibliothécaire doit pouvoir enregistrer un nouvel emprunteur, valider ses emprunts et ses retours
-	Un bibliothécaire doit pouvoir valider ou supprimer des commentaires sur des objets envoyés par les visiteurs
-	Le bibliothécaire référent doit pouvoir ajouter, suspendre ou supprimer autant de compte de bibliothécaire qu’il le souhaite
-	Un emprunteur doit pouvoir réserver un objet indisponible en laissant sur la fiche de l’objet son ID emprunteur à partir duquel un email sera envoyé dès que le retour de l’objet sera validé par un bibliothécaire. La réservation est valable 5 jours.
-	Un bibliothécaire doit pouvoir imprimer un reçu à la demande de l’emprunteur avec la liste des objets empruntés et la date limite de retour.
-	Un emprunteur doit pouvoir consulter sur la fiche d’un objet le nombre de fois qu’il a été emprunté sur la dernière année glissante (période considérée : date de consultation – 365 jours)


Les contraintes :
-	L’application est livrée de base avec un mot de passe admin par défaut que le bibliothécaire référent doit changer à la première connexion. Ce compte permettra uniquement d’ajouter ou de supprimer des comptes de bibliothécaire utilisateur qui auront le pouvoir de gérer la bibliothèque
-	La validité d’une inscription dure un an suite au paiement de l’abonnement 
-	Aucun emprunt ne peut se faire au-delà de la date limite de validité d’un abonnement
-	Durée d’emprunt : 21 jours à compter de la date d’emprunt
-	Sanctions en cas de perte :
	o	5€ pour les supports audio
	o	7€ pour les livres et DVD/bluray
-	Sanction en cas de retour d’objet abîmé :
	o	1€ d’amende
-	Toute amende non payée entraîne la suspension des emprunts
-	Si l’emprunteur retourne les objets empruntés au-delà des 21jours autorisés, l’emprunt de nouveaux objets ne pourra se faire qu’à la date définie par la date de retour + nombre de jours de retard
-	Le nombre d’objets pouvant être empruntés est limité à 5 à la condition que tous les objets précédemment empruntés aient été retournés
-	La réservation d’un objet est valable 5 jours.


Cas d'utilisation: voir fichier "diagramme cas utilisation.svg" à la racine

Diagrammes d'activités: voir fichier "diagrammes d'activités.svg" à la racine

Maquettes de l'application: voir fichier "maquettes.svg" à la racine

Backlog accessible à l'adresse: https://trello.com/b/ixVU26vL/gestion-de-biblioth%C3%A8que


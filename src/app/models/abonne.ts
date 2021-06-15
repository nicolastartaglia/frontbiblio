export class Abonne {
  public id: number;
  public Prenom: string;
  public Nom: string;
  public Email: string;
  public Rue: string;
  public CodePostal: string;
  public Ville: string;
  public DateLimiteAbonnement: string;
  public Amende: number;
  public DateEmpruntPossible: string;
  public CreePar: number;
  public MisAJourPar: number;

  constructor( id: number,
               Prenom: string,
               Nom: string,
               Email: string,
               Rue: string,
               CodePostal: string,
               Ville: string,
               DateLimiteAbonnement: string,
               Amende: number,
               DateEmpruntPossible: string,
               CreePar: number,
               MisAJourPar: number
               ) {
    this.id = id,
    this.Prenom = Prenom;
    this.Nom = Nom;
    this.Email = Email;
    this.Rue = Rue;
    this.CodePostal = CodePostal;
    this.Ville = Ville;
    this.DateLimiteAbonnement = DateLimiteAbonnement;
    this.Amende = Amende;
    this.DateEmpruntPossible = DateEmpruntPossible;
    this.CreePar = CreePar;
    this.MisAJourPar = MisAJourPar;
  }
}

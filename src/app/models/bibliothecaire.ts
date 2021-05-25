export class Bibliothecaire {
  public Nom: string;
  public Prenom: string;
  public Email: string;
  public Password: string;
  public Referent: boolean;
  public Statut: string;

  constructor( Nom: string,
               Prenom: string,
               Email: string,
               Password: string,
               Referent: boolean,
               Statut: string ) {

    this.Nom = Nom;
    this.Prenom = Prenom;
    this.Email = Email;
    this.Password = Password;
    this.Referent = Referent;
    this.Statut = Statut;
  }
}

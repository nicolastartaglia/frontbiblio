export class Bibliothecaire {
  public id: number;
  public Nom: string;
  public Prenom: string;
  public Email: string;
  public Password: string;
  public Referent: boolean;
  public Statut: string;

  constructor( id: number,
               Nom: string,
               Prenom: string,
               Email: string,
               Password: string,
               Referent: boolean,
               Statut: string ) {

    this.id = id,
    this.Nom = Nom;
    this.Prenom = Prenom;
    this.Email = Email;
    this.Password = Password;
    this.Referent = Referent;
    this.Statut = Statut;
  }
}

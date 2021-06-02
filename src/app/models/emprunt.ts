export class Emprunt {
  public id: number;
  public DateEmprunt: Date;
  public DateRetour: Date;
  public DateRetourLimite: Date;
  public Statut: string;

  constructor( id: number,
               DateEmprunt: Date,
               DateRetour: Date,
               DateRetourLimite: Date,
               Statut: string
              ) {
    this.id = id;
    this.DateEmprunt = DateEmprunt;
    this.DateRetour = DateRetour;
    this.DateRetourLimite = DateRetourLimite;
    this.Statut = Statut;
  }
}

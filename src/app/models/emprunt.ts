export class Emprunt {
  public id: number;
  public DateRetourLimite: Date;
  public Statut: string;

  constructor( id: number,
               DateRetourLimite: Date,
               Statut: string
              ) {
    this.id = id,
    this.DateRetourLimite = DateRetourLimite;
    this.Statut = Statut;
  }
}

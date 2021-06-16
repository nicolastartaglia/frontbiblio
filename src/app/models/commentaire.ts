export class Commentaire {
    public id: number;
    public DateCommentaire: string;
    public Contenu: string;
    public objetId: number;
    public prisEnChargePar: number;
    public Statut: string;

    constructor(id: number,
                DateCommentaire: string,
                Contenu: string,
                objetId: number,
                prisEnChargePar: number,
                Statut: string) {
      this.id = id,
      this.DateCommentaire = DateCommentaire;
      this.Contenu = Contenu;
      this.objetId = objetId;
      this.prisEnChargePar = prisEnChargePar;
      this.Statut = Statut;
    }
}

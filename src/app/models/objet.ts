export class Objet {
  public id: number;
  public Titre: string;
  public AuteurScenariste: string;
  public Realisateur: string;
  public Scenariste: string;
  public Genre: string;
  public Annee: string;
  public Duree: number;
  public Description: string;
  public Edition: string;
  public Pages: number;
  public Dessinateur: string;
  public Artiste: string;
  public Zone: string;
  public Travee: string;
  public EtagereBac: string;
  public Code3C: string;
  public Etat: string;
  public Reserve: string;
  public DateReservation: Date;
  public TypeObjet: string;
  public empruntId: number;
  public ReservePar: number;
  public CreePar: number;
  public MisAJourPar: number;

  constructor(id: number,
              Titre: string,
              AuteurScenariste: string,
              Realisateur: string,
              Scenariste: string,
              Genre: string,
              Annee: string,
              Duree: number,
              Description: string,
              Edition: string,
              Pages: number,
              Dessinateur: string,
              Artiste: string,
              Zone: string,
              Travee: string,
              EtagereBac: string,
              Code3C: string,
              Etat: string,
              Reserve: string,
              DateReservation: Date,
              TypeObjet: string,
              empruntId: number,
              ReservePar: number,
              CreePar: number,
              MisAJourPar: number
               ) {
    this.id = id;
    this.Titre = Titre;
    this.AuteurScenariste = AuteurScenariste;
    this.Realisateur = Realisateur;
    this.Scenariste = Scenariste;
    this.Genre = Genre;
    this.Annee = Annee;
    this.Duree = Duree;
    this.Description = Description;
    this.Edition = Edition;
    this.Pages = Pages;
    this.Dessinateur = Dessinateur;
    this.Artiste = Artiste;
    this.Zone = Zone;
    this.Travee = Travee;
    this.EtagereBac = EtagereBac;
    this.Code3C = Code3C;
    this.Etat = Etat;
    this.Reserve = Reserve;
    this.DateReservation = DateReservation;
    this.TypeObjet = TypeObjet;
    this.empruntId = empruntId;
    this.ReservePar = ReservePar;
    this.CreePar = CreePar;
    this.MisAJourPar = MisAJourPar;
  }
}

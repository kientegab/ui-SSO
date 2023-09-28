import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArrondissement, Arrondissement } from 'src/app/shared/model/arrondissement.model';
import { Assure, IAssure } from 'src/app/shared/model/assure';
import { ICommune, Commune } from 'src/app/shared/model/commune.model';
import { IProvince, Province } from 'src/app/shared/model/province.model';
import { IRegion, Region } from 'src/app/shared/model/region.model';
import { ISecteurVillage, SecteurVillage } from 'src/app/shared/model/secteurvillage.model';
import { IGlobalStats, GlobalStats } from 'src/app/shared/model/stats/global-stats.model';
import { ITypesAssure } from 'src/app/shared/model/typesAssures.model';
import { ArrondissementService } from 'src/app/shared/service/arrondissement-service';
import { CommuneService } from 'src/app/shared/service/commune-service';
import { ProvinceService } from 'src/app/shared/service/province-service';
import { RegionService } from 'src/app/shared/service/region.service';
import { ReportService } from 'src/app/shared/service/report.service';
import { SecteurVillageService } from 'src/app/shared/service/secteur-village-service';
import { TypesAssureService } from 'src/app/shared/service/types-assure.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.scss']
})
export class ImmatriculationComponent { 

  @ViewChild('dtf') form!: NgForm; 

  assureValues: IAssure[] = [];
  assureValue: IAssure = new Assure();

  listSexe: any[]=[];
  sexeSelected: string = '';

  listStatut: any[]=[];
  statutSelected: boolean = true;

  selectedCatEmp: any[]=[];
  regions: IRegion []= [];
  regionSelected: IRegion = new Region();
  provinces: IProvince []= [];
  provinceSelected: IProvince = new Province();
  communes: ICommune[]= [];
  communeSelected: ICommune = new Commune();
  arrondissements: IArrondissement[] = [];
  arrondissementSelected: IArrondissement = new Arrondissement();
  secteurVillages: ISecteurVillage[] = [];
  secteurVillageSelected: ISecteurVillage = new SecteurVillage();
  assures: ITypesAssure[] = [];
  typeAssureSelected?: ITypesAssure;
  isLoading!: boolean;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;

  dateDebutPeriode?: Date;
  dateFinPeriode?: Date;

  message: any;

  /**
   * 
   */
  criteres: IGlobalStats  = new GlobalStats();
  formats: string[] = ['PDF','DOCX', 'XLSX'];
  formatSelected!: string;
  formatvisible: boolean = false;
 
  /**
   * 
   * @param regionService 
   * @param communeService 
   * @param arrondissementServiceService 
   * @param secteurVillageService 
   * @param typeAssureService 
   * @param provinceService 
   * @param reportService 
   */
    constructor( 
      private regionService: RegionService,
      private communeService: CommuneService,
      private arrondissementServiceService: ArrondissementService,
      private secteurVillageService: SecteurVillageService,
      private typeAssureService: TypesAssureService,
      private provinceService: ProvinceService,
      private reportService: ReportService) { 

    } 
    
    ngOnInit(): void {
      this.loadSexe();
      this.loadStatut();
      this.loadRegion();
      this.loadTypeAsssure();
    } 

    loadRegion() {  
      this.regionService.findListe().subscribe({
        next: (reponse:any)=>{
          if (reponse && reponse.body) {
            this.regions = reponse.body!; 
          }
        },
        error: (raison:any) => {
          this.message = { severity: 'error', summary: raison.error };
        }
      }); 
    }

    loadTypeAsssure() {  
      this.typeAssureService.findListe().subscribe({
        next: (reponse:any)=>{
          if (reponse && reponse.body) {
            this.assures = reponse.body!; 
          }
        },
        error: (raison:any) => {
          this.message = { severity: 'error', summary: raison.error };
        }
      }); 
    }
  
    onSelectedRegion(region: IRegion): void {
      if(region){  
        this.provinceService.findProvinceByIdRegion(region.id!).subscribe({
          next: (reponse:any)=>{
            if (reponse && reponse.body) {
              this.provinces = reponse.body!;
            }
          },
          error: (raison:any) => {
            this.message = { severity: 'error', summary: raison.error };
          } 
        });
      }
    }

    onSelectedProvince(province: IProvince): void {
      if(province){  
        this.communeService.findCommuneByIdProvince(province.id!).subscribe({
          next: (reponse:any)=>{
            if (reponse && reponse.body) {
              this.communes = reponse.body!;
            }
          },
          error: (raison:any) => {
            this.message = { severity: 'error', summary: raison.error };
          } 
        }); 
      } 
    }

    onSelectedCommune(commune: ICommune){
      if(commune){  
        this.arrondissementServiceService.findArrondByIdCommune(commune.id!).subscribe({
          next: (reponse:any)=>{
            if (reponse && reponse.body) {
              this.arrondissements = reponse.body!;
            }
          },
          error: (raison:any) => {
            this.message = { severity: 'error', summary: raison.error };
          } 
        }); 
      }
    }
        
    onSelectedArrondissement(arrondissement: IArrondissement){
      if(arrondissement){   
          this.secteurVillageService.findSecteurVByIdArron(arrondissement.id!).subscribe({
            next:(reponse:any)=>{
              if (reponse && reponse.body) {
                this.secteurVillages = reponse.body!;
              }
            },
            error: (raison:any) => {
              this.message = { severity: 'error', summary: raison.error };
            } 
          }); 
      }
    }

 /** Permet d'afficher le tableau avec tout les elements */
  checkImmatriculation(data: any): void {
    this.isLoading = true;
    if(data){
      this.reportService.checkImmatriculation(data).subscribe({
          next: (result:any) => {
            if (result && result.body) { 
              this.isLoading = false;
              this.assureValues = result.body!;
            }
          },
          error: (reason:any) => {
            this.message = { severity: 'error', summary: reason.error };
            console.error(JSON.stringify(reason));
          }
      });
    }
  }

  /**
   * 
   * @param data 
   * @param format 
   */
  exportImmatriculation(data: any, format: string): void{
    this.reportService.exportImmatriculation(data, format).subscribe({
      next: (result:any) => { 
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'immatriculations_export.' + format; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (reason:any) => {
        this.message = { severity: 'error', summary: reason.error };
        console.error(JSON.stringify(reason));
      }
  });
  }

  loadSexe() : any {  
      this.listSexe =[ 
      { "libelle": "MASCULIN", "valeur": "MASCULIN" },
      { "libelle": "FEMININ", "valeur": "FEMININ" }
    ];
  }

  loadStatut() : any {  
    this.listStatut =[
    {"libelle":"Validé", "value": true},
    {"libelle":"Non validé", "value": false}
  ];
}

  rechercher():void {
    this.isLoading = true; 
    
    this.criteres = new GlobalStats(); 
    this.criteres.categorie = "";
    this.criteres.region = (this.regionSelected) ? (this.regionSelected.id) : 0;
    this.criteres.province = (this.provinceSelected) ? (this.provinceSelected.id) : 0;
    this.criteres.commune = (this.communeSelected) ? (this.communeSelected.id) : 0;
    this.criteres.arrondissement = (this.arrondissementSelected) ? (this.arrondissementSelected.id) : 0;
    this.criteres.secteurVillage = (this.secteurVillageSelected) ? (this.secteurVillageSelected.id) : 0;

    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;

    this.criteres.typeAssureId = (this.typeAssureSelected) ? this.typeAssureSelected.id : 0;

    if(this.sexeSelected){
      this.criteres.genre =  JSON.stringify(this.sexeSelected).includes('MASCULIN') ? 'MASCULIN' : 'FEMININ';
    } 

    if(this.statutSelected){
      this.criteres.statut =  !JSON.stringify(this.statutSelected).includes('Non');
    } 

    console.log("=========> verifying ========", this.criteres.statut);

    this.checkImmatriculation( this.criteres); 

    this.isLoading = false;
  }

  exporter():void {
    this.formatvisible = false; 

    this.criteres = new GlobalStats(); 
    this.criteres.categorie = "";
    this.criteres.region = (this.regionSelected) ? (this.regionSelected.id) : 0;
    this.criteres.province = (this.provinceSelected) ? (this.provinceSelected.id) : 0;
    this.criteres.commune = (this.communeSelected) ? (this.communeSelected.id) : 0;
    this.criteres.arrondissement = (this.arrondissementSelected) ? (this.arrondissementSelected.id) : 0;
    this.criteres.secteurVillage = (this.secteurVillageSelected) ? (this.secteurVillageSelected.id) : 0;

    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;  

    this.criteres.typeAssureId = (this.typeAssureSelected) ? this.typeAssureSelected.id : 0;

    if(this.sexeSelected){
      this.criteres.genre =  JSON.stringify(this.sexeSelected).includes('MASCULIN') ? 'MASCULIN' : 'FEMININ';
    }  
    if(this.statutSelected){
      this.criteres.statut =  !JSON.stringify(this.statutSelected).includes('Non');
    } 

    console.log("=========> verifying ========", this.criteres.statut);

    this.exportImmatriculation(this.criteres, this.formatSelected);

  }

  showDialog():void {
    this.formatvisible = true;
  }
  
}

//import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {CategorieEmployeurService} from 'src/app/shared/service/categorie-employeur-service'

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRegion, Region } from 'src/app/shared/model/region.model';
import { Commune, ICommune } from 'src/app/shared/model/commune.model';
import { Arrondissement, IArrondissement } from 'src/app/shared/model/arrondissement.model';
import { ISecteurVillage, SecteurVillage } from 'src/app/shared/model/secteurvillage.model';
import { RegionService } from 'src/app/shared/service/region.service';
import { CommuneService } from 'src/app/shared/service/commune-service';
import { ArrondissementService } from 'src/app/shared/service/arrondissement-service';
import { SecteurVillageService } from 'src/app/shared/service/secteur-village-service';
import { IProvince, Province } from 'src/app/shared/model/province.model';
import { ProvinceService } from 'src/app/shared/service/province-service';
import { AffiliationStep, IAffiliationStep } from 'src/app/shared/model/affiliation-step';
import { AffiliationService } from 'src/app/shared/service/affiliation.service';
import { environment } from 'src/environments/environment';
import { GlobalStats, IGlobalStats } from 'src/app/shared/model/stats/global-stats.model';
import { ReportService } from 'src/app/shared/service/report.service';

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.scss']
})
export class AffiliationComponent implements OnInit {
  
  affiliationSteps: IAffiliationStep[] = [];
  affiliationStep: IAffiliationStep = new AffiliationStep();
  @ViewChild('dtf') form!: NgForm;
  //subscription: Subscription;
  categorieEmp: any;
  listCategorieEmp: any[]=[];
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
   * @param layoutService 
   * @param categorieEmployeurService 
   * @param regionService 
   * @param communeService 
   * @param arrondissementServiceService 
   * @param secteurVillageService 
   * @param affiliationStepService 
   * @param provinceService 
   */ 
    constructor(
      private layoutService: LayoutService, 
      private categorieEmployeurService : CategorieEmployeurService,
      private regionService: RegionService,
      private communeService: CommuneService,
      private arrondissementServiceService: ArrondissementService,
      private secteurVillageService: SecteurVillageService,
      private affiliationStepService: AffiliationService,
      private provinceService: ProvinceService,
      private reportService: ReportService) { 

    } 
    
    ngOnInit(): void {
      this.getCategorieEmployeur();
      //this.loadAll();
      this.loadRegion();
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
  checkAffiliation(data: any): void {
    this.isLoading = true;
    if(data){
      this.reportService.checkAffiliation(data).subscribe({
          next: (result:any) => {
            if (result && result.body) { 
              this.isLoading = false;
              this.affiliationSteps = result.body!;
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
  exportAffiliation(data: any, format: string): void{
    this.reportService.exportAffiliation(data, format).subscribe({
      next: (result:any) => {
        //affiliations_export
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'affiliations_export.' + format; // Set the desired file name
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

  getCategorieEmployeur() : any {
    /*this.categorieEmployeurService.getAll().subscribe(response => {
      this.listCategorieEmp = response.categorieEmployeurs;
      console.log(this.listCategorieEmp)
    });*/

      this.listCategorieEmp =[
      {"libelle":"Personne Physique","value":false},
      {"libelle":"Personne Morale","value":true}
    ];
  }

  rechercher():void {
    this.isLoading = true;
    console.log("=========> verifying ========")
    
    this.criteres = new GlobalStats(); 
    this.criteres.categorie = "";
    this.criteres.region = (this.regionSelected) ? (this.regionSelected.id) : 0;
    this.criteres.province = (this.provinceSelected) ? (this.provinceSelected.id) : 0;
    this.criteres.commune = (this.communeSelected) ? (this.communeSelected.id) : 0;
    this.criteres.arrondissement = (this.arrondissementSelected) ? (this.arrondissementSelected.id) : 0;
    this.criteres.secteurVillage = (this.secteurVillageSelected) ? (this.secteurVillageSelected.id) : 0;

    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;

    this.checkAffiliation( this.criteres); 

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

    this.exportAffiliation(this.criteres, this.formatSelected);

  }

  showDialog():void {
    this.formatvisible = true;
  }

}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAssure, Assure } from 'src/app/shared/model/assure';
import { IGlobalStats, GlobalStats } from 'src/app/shared/model/stats/global-stats.model';
import { ReportService } from 'src/app/shared/service/report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @ViewChild('dtf') form!: NgForm; 

  assureValues: IAssure[] = [];
  assureValue: IAssure = new Assure();
 
  
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
    constructor(private reportService: ReportService) { 

    } 
    
    ngOnInit(): void { 

    }  

 /** Permet d'afficher le tableau avec tout les elements */
  checkCarte(data: any): void {
    this.isLoading = true;
    if(data){
      this.reportService.checkCarte(data).subscribe({
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
  exportCarte(data: any, format: string): void{
    this.reportService.exportCarte(data, format).subscribe({
      next: (result:any) => { 
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cartes_export.' + format; 
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

  rechercher():void {
    this.isLoading = true; 
    
    this.criteres = new GlobalStats(); 
    
    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode; 

    console.log("=========> verifying ========");

    this.checkCarte(this.criteres); 

    this.isLoading = false;
  }

  exporter():void {
    this.formatvisible = false; 

    this.criteres = new GlobalStats(); 
    
    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;  

    console.log("=========> verifying ========", this.criteres.statut);

    this.exportCarte(this.criteres, this.formatSelected);

  }

  showDialog():void {
    this.formatvisible = true;
  }
}

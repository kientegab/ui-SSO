import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Declaration, IDeclaration } from 'src/app/shared/model/declaration';
import { IGlobalStats, GlobalStats } from 'src/app/shared/model/stats/global-stats.model';
import { ITypeEmployeur } from 'src/app/shared/model/typeEmployeur.model';
import { ReportService } from 'src/app/shared/service/report.service';
import { TypeEmployeurService } from 'src/app/shared/service/type-employeur-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent {

  @ViewChild('dtf') form!: NgForm; 

  declarationValues: IDeclaration[] = [];
  declarationValue: IDeclaration = new Declaration(); 
     
  typeEmployeurs: ITypeEmployeur[] = [];
  typeEmployeurSelected?: ITypeEmployeur;

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
   * @param typeEmployeurService 
   * @param reportService 
   */
    constructor( 
      private typeEmployeurService: TypeEmployeurService, 
      private reportService: ReportService) { 

    } 
    
    ngOnInit(): void { 
      this.loadTypeEmployeur();
    } 

    loadTypeEmployeur() {  
      this.typeEmployeurService.findListe().subscribe({
        next: (reponse:any)=>{
          if (reponse && reponse.body) {
            this.typeEmployeurs = reponse.body!; 
          }
        },
        error: (raison:any) => {
          this.message = { severity: 'error', summary: raison.error };
        }
      }); 
    }   

 /** Permet d'afficher le tableau avec tout les elements */
  checkDeclaration(data: any): void {
    this.isLoading = true;
    if(data){
      this.reportService.checkDeclaration(data).subscribe({
          next: (result:any) => {
            if (result && result.body) { 
              this.isLoading = false;
              this.declarationValues = result.body!;
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
  exportDeclaration(data: any, format: string): void{
    this.reportService.exportDeclaration(data, format).subscribe({
      next: (result:any) => { 
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'declarations_export.' + format; // Set the desired file name
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
    this.criteres.categorie = ""; 
    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;

    this.criteres.typeEmployeurId = (this.typeEmployeurSelected) ? this.typeEmployeurSelected.id : 0; 

    console.log("=========> verifying ========", this.criteres.statut);

    this.checkDeclaration(this.criteres); 

    this.isLoading = false;
  }

  exporter():void {
    this.formatvisible = false; 

    this.criteres = new GlobalStats(); 
    this.criteres.categorie = ""; 
    this.criteres.debut = this.dateDebutPeriode;
    this.criteres.fin = this.dateFinPeriode;  

    this.criteres.typeEmployeurId = (this.typeEmployeurSelected) ? this.typeEmployeurSelected.id : 0; 

    this.exportDeclaration(this.criteres, this.formatSelected);

  }

  showDialog():void {
    this.formatvisible = true;
  }
  
}

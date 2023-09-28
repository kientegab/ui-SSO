import { Component, OnInit, Input } from '@angular/core';
import {  Commune, ICommune } from '../../../shared/model/commune.model';
import { CommuneService } from '../../../shared/service/commune-service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreerModifierCommuneComponent } from './creer-modifier-commune/creer-modifier-commune.component';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ProvinceService } from 'src/app/shared/service/province-service';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsCommuneComponent } from './details-commune/details-commune.component';
import { CURRENT_PAGE, ITEMS_PER_PAGE2, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.scss']
})
export class CommuneComponent implements OnInit {
  routeData: Subscription | undefined;
  communeListSubscription: Subscription | undefined;
  communes: ICommune[] = [];
  commune: ICommune = new Commune();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  regionDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  enableCreate = true;

  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  //itemsPerPage = ITEMS_PER_PAGE2;
  predicate!: string;
  ascending!: boolean;
  reverse: any;

  filtreLibelle: string | undefined;
  items: MenuItem[] = [];

  

  constructor(
    private communeService: CommuneService,
    private activatedRoute: ActivatedRoute,
    private provinceService: ProvinceService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private router: Router,
    private confirmationService: ConfirmationService
    ){}


   ngOnInit(): void { 
        this.activatedRoute.data.subscribe(
          () => {
            this.loadAll();
          }
        );
        
      }

      ngOnDestroy(): void {
        if (this.routeData) {
          this.routeData.unsubscribe();
          if (this.communeListSubscription) {
            this.communeListSubscription.unsubscribe();
          }
        }
      }

      filtrer(): void {
        this.loadAll();
      }
    
      resetFilter(): void {
        this.filtreLibelle = undefined;
        this.filtrer();
      }

      loadPage(event:any): void {
        if(event){
          this.page = event.first/event.rows + 1; 
          this.recordsPerPage = event.rows;
        }
        this.transition();
      }
    
      transition(): void {
        this.router.navigate(['./'], {
          relativeTo: this.activatedRoute.parent,
          queryParams: {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
          },
        });
        this.loadAll();
      }

      loadAll(): void {
        const req = this.buildReq();
        this.communeService.query(req).subscribe(result => {
          if (result && result.body) {
            this.totalRecords = Number(result.headers.get('X-Total-Count'));
            this.communes = result.body || [];
          }
        });
      }
      
        
      sortMethod(): string[] {
        this.predicate = 'id';
        this.reverse = true;
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
      }

      buildReq(): any {
        let req = {
          page: this.page -1,
          size: this.recordsPerPage,
          sort: this.sortMethod(),
        };
        let obj : any;
        if (this.filtreLibelle) {
          obj = {};
          obj['libelle.contains'] = this.filtreLibelle;
          req = Object.assign({}, req, obj);
        }
        return req;
      }

      // load(event?: LazyLoadEvent): void {
      //   this.isLoading = true;
      //   this.communeService.findAll(event).subscribe(
      //     {
      //       next: (result) => {
      //         if (result && result.body) {
      //           this.isLoading = false;
      //           this.communes = result.body!;
      //         }
      //       },
      //       error: (reason) => {
      //         this.message = { severity: 'error', summary: reason.error };
      //         console.error(JSON.stringify(reason));
      //       }
      //     });
      // }

      /** Permet d'afficher un modal pour l'ajout */
      openModalCreate(): void {
        this.dialogService.open(CreerModifierCommuneComponent,
          {
            header: 'Ajouter une commune',
            width: '60%',
            contentStyle: { overflow: 'auto', },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
          }
        ).onClose.subscribe(result => {
          if(result) {
          this.communes.push(result);
          this.isDialogOpInProgress = false;
          this.showMessage({ severity: 'success', summary: 'Commune créée avec succès' });
          }
        });
      }

      /** Permet d'afficher un modal pour la modification */
      openModalEdit(commune: ICommune): void {
        this.dialogService.open(CreerModifierCommuneComponent,
          {
            header: 'Modifier un commune',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: commune
          }).onClose.subscribe(result => {
            if(result){
              this.isDialogOpInProgress = false;
              this.loadAll();
              this.showMessage({ severity: 'success', summary: 'Commune modifiée avec succès' });
            }
           
          });

      }

      /** Permet d'afficher un modal pour voir les détails */
      openModalDetail(commune:ICommune): void {
        this.dialogService.open(DetailsCommuneComponent,
          {
            header: 'Details de commune',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: commune
          });
      }


      // Deletion
      onDelete(commune: ICommune) {
        this.confirmationService.confirm({
          message: 'Etes-vous sur de vouloir supprimer ce commune?',
          accept: () => {
            this.delete(commune);
          }
        });
      }

      delete(selection: any) {
        this.isOpInProgress = true;
        this.communeService.delete(selection.id).subscribe(() => {
          this.communes = this.communes.filter(commune => commune.id !== selection.id);
          selection = null;
          this.isOpInProgress = false;
          this.totalRecords--;
          this.showMessage({
            severity: 'success',
            summary: 'Commune supprimée avec succès',
          });
        }, (error) => {
          console.error("commune " + JSON.stringify(error));
          this.isOpInProgress = false;
          this.showMessage({ severity: 'error', summary: error.error.message });
        });
      }
      // Errors
      handleError(error: HttpErrorResponse) {
        console.error(`Processing Error: ${JSON.stringify(error)}`);
        this.isDialogOpInProgress = false;
        this.dialogErrorMessage = error.error.title;
      }
      // Messages

      clearDialogMessages() {
        this.dialogErrorMessage = null;
      }

      showMessage(message: Message) {
        this.message = message;
        this.timeoutHandle = setTimeout(() => {
          this.message = null;
        }, 5000);
      }



}

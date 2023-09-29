import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';
import { DetailsPrivilegeComponent } from './details-privilege/details-privilege.component';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { CreerModifierPrivilegeComponent } from './creer-modifier-privilege/creer-modifier-privilege.component';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit, OnDestroy {


  routeData: Subscription | undefined;
  privilegeListSubscription: Subscription | undefined;
  privileges: IPrivilege[] = [];
  privilege: IPrivilege = new Privilege();
  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  regionDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  enableCreate = true;

  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;

  filtreLibelle: string | undefined;

  @ViewChild('dtf') form!: NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private privilegeService: PrivilegeService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      () => {
        this.loadAll();
      }
    );
  }

  filtrer(): void {
    this.loadAll();
  }

  resetFilter(): void {
    this.filtreLibelle = undefined;
    this.filtrer();
  }

  ngOnDestroy(): void {
    if (this.routeData) {
      this.routeData.unsubscribe();
      if (this.privilegeListSubscription) {
        this.privilegeListSubscription.unsubscribe();
      }
    }
  }

  loadPage(event: any): void {
    if (event) {
      this.page = event.first / event.rows + 1;
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
  /** Permet d'afficher le tableau avec tout les elements */
  loadAll(): void {
    const req = this.buildReq();
    this.privilegeService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.privileges = result.body || [];
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
      page: this.page - 1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj: any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
  }

  /** Permet d'afficher un modal pour l'ajout */
  openModalCreate(): void {
    this.dialogService.open(CreerModifierPrivilegeComponent,
      {
        header: 'Ajouter un privilège',
        width: '60%',
        contentStyle: { overflow: 'auto', },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
      }
    ).onClose.subscribe(result => {
      if(result) {
      this.privileges.push(result);
      this.isDialogOpInProgress = false;
      this.showMessage({ severity: 'success', summary: 'Privilège créé avec succès' });
      }
    });
  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(privilege: IPrivilege): void {
    this.dialogService.open(CreerModifierPrivilegeComponent,
      {
        header: 'Modifier un privilège',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        data: privilege
      }).onClose.subscribe(result => {
        if(result){
          this.isDialogOpInProgress = false;
          this.loadAll();
          this.showMessage({ severity: 'success', summary: 'Privilège modifiée avec succès' });
        }
       
      });

  }

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(privilege:IPrivilege): void {
    this.dialogService.open(DetailsPrivilegeComponent,
      {
        header: 'Details de privilège',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: privilege
      });
  }


  // Deletion
  onDelete(privilege: IPrivilege) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce privilege?',
      accept: () => {
        this.delete(privilege);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.privilegeService.delete(selection.id).subscribe(() => {
      this.privileges = this.privileges.filter(privilege => privilege.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Privilège supprimée avec succès',
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





import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { IProfil, Profil } from 'src/app/shared/model/profil';
import { ProfilService } from 'src/app/shared/service/profil.service';
import { CreerModifierProfilComponent } from './creer-modifier-profil/creer-modifier-profil.component';
import { DetailsProfilComponent } from './details-profil/details-profil.component';
import { ProfilPrivilegeComponent } from './profil-privilege/profil-privilege.component';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  routeData: Subscription | undefined;
  profilListSubscription: Subscription | undefined;
  profils: IProfil[] = [];
  profil: IProfil = new Profil();

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords: number = 0;
  recordsPerPage = environment.recordsPerPage;
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  enableBtnClose = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;

  filtreLibelle: string | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private profilService: ProfilService,
    private dialogService: DialogService,
    private router: Router,
    private confirmationService: ConfirmationService,
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
      if (this.profilListSubscription) {
        this.profilListSubscription.unsubscribe();
      }
    }
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
 /** Permet d'afficher le tableau avec tout les elements */
  loadAll(): void {
    const req = this.buildReq();
    this.profilService.query(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.profils = result.body || [];
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


  /** Permet d'afficher un modal pour l'ajout */
  openModalCreate(): void {
    this.dialogService.open(CreerModifierProfilComponent,
      {
        header: 'Ajouter un profil',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
      }
    ).onClose.subscribe(result => {
      if(result) {
        this.profils.push(result.body);
        this.isDialogOpInProgress = false;
        this.showMessage({ severity: 'success', summary: 'Profil creer avec succès' });
        }
    });
  }

  /** Permet d'afficher un modal pour la modification */
  openModalEdit(profil: IProfil): void {
    this.dialogService.open(CreerModifierProfilComponent,
      {
        header: 'Modifier un profil',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        closable: true,
        data: profil
      }).onClose.subscribe(result => {
        if(result) {
        this.loadAll();
        this.showMessage({
          severity: 'success',
          summary: 'Modifier avec succès',
        });
      }
      });
   
  }

  /** Permet d'afficher un modal pour voir les détails */
  openModalDetail(profil: IProfil): void {
    this.dialogService.open(DetailsProfilComponent,
      {
        header: 'Details du profil',
        width: '60%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: profil
      });
  }



  // Deletion
  onDelete(profil: IProfil) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce taux de cotisation?',
      accept: () => {
        this.delete(profil);
      }
    });
  }

  
    /** Permet d'afficher un modal pour la modification */
    openModalPermission(profil: IProfil): void {
      this.dialogService.open(ProfilPrivilegeComponent,
        {
          header: 'Ajouter des permissions',
          width: '60%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          closable: true,
        }
      ).onClose.subscribe(result => {
        // this.profils.push(result.body);
        // this.showMessage({
        //   severity: 'success',
        //   summary: 'Taux creer avec succès',
        // });
      });
    }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.profilService.delete(selection.id).subscribe(() => {
      this.profils = this.profils.filter(profil => profil.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Exemple supprimé avec succès',
      });
    }, (error) => {
      console.error("Exemple " + JSON.stringify(error));
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

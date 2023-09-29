import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';
import { IProfil, IProfilDTO, Profil, ProfilDTO } from 'src/app/shared/model/profil';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';
import { ProfilService } from 'src/app/shared/service/profil.service';

@Component({
  selector: 'app-creer-modifier-profil',
  templateUrl: './creer-modifier-profil.component.html',
  styleUrls: ['./creer-modifier-profil.component.scss']
})
export class CreerModifierProfilComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  profil: IProfil = new Profil();
  @Input() data: IProfil = new Profil();
  error: String | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  //@Input() data: IProfil | undefined;

  profilDto: IProfilDTO = new ProfilDTO();

  listePrivilege: IPrivilege[] = [];
  privilege: IPrivilege = new Privilege();
  allSelected: any;
  searchText: string | undefined;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private profilService: ProfilService,
    private privilegeService: PrivilegeService,
  ) {
  }

  ngOnInit(): void {
  //  this.loadRoleSelect();
    this.loadAllPrivillege();
    if (this.dynamicDialog.data) {
      this.profil = cloneDeep(this.dynamicDialog.data);
    }
  }
  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }

  // loadRoleSelect(): void {
  //   this.profilService.findByName(this.profil?.libelle).subscribe(result => {
  //     if (result && result.body) {
  //       this.profil = result.body;
  //     }
  //   });
  // }

  isEditing() {
    return !!this.profil.id;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }
  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }

  loadAllPrivillege(): void {
    this.privilegeService.findListe().subscribe(result => {
      if (result && result.body) {
        this.listePrivilege = result.body || [];
        if (this.listePrivilege && this.listePrivilege.length > 0) {
          this.listePrivilege.map(lp => {
            lp.isChecked = this.profil.privilegeCollection?.some(a => JSON.stringify(a.libelle) === JSON.stringify(lp.libelle));
          });
        }
      }
    });
  }

  checkUncheckAll(): void {
    this.listePrivilege.map(p => {
      this.listePrivilege.find(e => e.libelle === p.libelle);

    })
    this.listePrivilege.forEach(p => {
      p.isChecked = this.allSelected;
    });
  }

  isAllSelected(): void {
    const notChecked = this.listePrivilege.find(p => !p.isChecked);
    if (notChecked) {
      this.allSelected = false;
    } else {
      this.allSelected = true;
    }
  }
  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  saveEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
   // let data: any[] = [];
   let data: IPrivilege[] = [];
    if (this.profil && this.listePrivilege && this.listePrivilege.length > 0) {
      this.profilDto.id = this.profil.id;
      this.profilDto.libelle = this.profil.libelle;
      this.profilDto.nativeProfile = this.profil.nativeProfile;
      this.listePrivilege.forEach(item => {
        if (item.isChecked) {
          data.push(item);
          this.profilDto.privileges = data;
        }
      });
    }
    if (this.profilDto.privileges && this.profilDto.privileges?.length > 0) {
      this.profil.privilegeCollection = this.profilDto.privileges;
      if (this.profil.id) {
        this.profilService.update(this.profil).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'Profil modifié avec succès' });

            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.profilService.create(this.profil).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'Profil creer avec succès',
            });
          },
          error: (error) => {
            console.error("error" + JSON.stringify(error));
            this.isOpInProgress = false;
            this.showMessage({ severity: 'error', summary: error.error.message });

          }
        });
      }
    }
  }


}

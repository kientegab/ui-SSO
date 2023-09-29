import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';
import { IProfil, IProfilDTO, Profil, ProfilDTO } from 'src/app/shared/model/profil';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';
import { ProfilService } from 'src/app/shared/service/profil.service';

@Component({
  selector: 'app-profil-privilege',
  templateUrl: './profil-privilege.component.html',
  styleUrls: ['./profil-privilege.component.scss']
})
export class ProfilPrivilegeComponent {

  routeData: Subscription | undefined;
  profilListSubscription: Subscription | undefined;

  @Input() data: IProfil | undefined;
  profil: IProfil = new Profil();

  profilDto: IProfilDTO = new ProfilDTO();

  listePrivilege: IPrivilege[] = [];
  privilege: IPrivilege = new Privilege();
  error: String | undefined;
  allSelected: any;
  searchText: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private privilegeService: PrivilegeService,
    private dynamicDialog: DynamicDialogConfig,
    private profilService: ProfilService,
    private dialogRef: DynamicDialogRef,
    private confirmationService: ConfirmationService,
  ) {

  }


  ngOnInit(): void {
    this.loadRoleSelect();
    if (this.dynamicDialog.data) {
      this.profil = cloneDeep(this.dynamicDialog.data);
    }
    this.activatedRoute.data.subscribe(
      () => {
        this.loadAll();
      }
    );
  }

  loadAll(): void {
    this.privilegeService.findListe().subscribe(result => {
      if (result && result.body) {
        this.listePrivilege = result.body || [];
        if (this.listePrivilege && this.listePrivilege.length > 0) {
          this.listePrivilege.map(lp => {
            lp.isChecked = this.profil.privilegeCollection?.some(a => JSON.stringify(a) === JSON.stringify(lp.libelle));
          });
        }
      }
    });
  }



  saveEntity(): void {
    let data: any[] = [];
    if (this.listePrivilege && this.listePrivilege.length > 0) {
      this.profilDto.id = this.profil.id;
      this.profilDto.libelle = this.profil.libelle;
      this.profilDto.nativeProfile = this.profil.nativeProfile;
      this.listePrivilege.forEach(item => {
        if (item.isChecked) {
          data.push(item.libelle);
          this.profilDto.privileges = data;
        }
      });
    }
    if (this.profilDto.privileges && this.profilDto.privileges?.length > 0) {
      this.confirmationService.confirm({
        message: '<span class="text- danger text - bold">Confirmez-vous l\'enregistrement de cette utilisateur ?</span>',
        accept: () => this.profilService.addPrivilege(this.profilDto).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
          },
          error: (reason) => {
            this.error = reason.error.errorkey;
          }
        }),
      });
    }
  }


  loadRoleSelect(): void {
    this.profilService.findByName(this.profil?.libelle).subscribe(result => {
      if (result && result.body) {
        this.profil = result.body;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeData) {
      this.routeData.unsubscribe();
      if (this.profilListSubscription) {
        this.profilListSubscription.unsubscribe();
      }
    }
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

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CommuneService } from 'src/app/shared/service/commune-service';
import { ProvinceService } from 'src/app/shared/service/province-service';

import { IProvince } from 'src/app/shared/model/province.model';
import { cloneDeep } from 'lodash';
import { Commune, ICommune} from 'src/app/shared/model/commune.model';

@Component({
  selector: 'app-creer-modifier-commune',
  templateUrl: './creer-modifier-commune.component.html',
  styleUrls: ['./creer-modifier-commune.component.scss']
})
export class CreerModifierCommuneComponent {
  @ViewChild('dtf') form!: NgForm;
  commune: ICommune = new Commune();
  @Input() data: ICommune = new Commune();
  communes: ICommune[]=[];
  provinces: IProvince[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;

  constructor(
    private communeService: CommuneService,
    private provinceService: ProvinceService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadProvince()
    if (this.dynamicDialog.data) {
      this.commune = cloneDeep(this.dynamicDialog.data);
    }
  }

  loadProvince(event?: LazyLoadEvent) {
    this.provinceService.findListe().subscribe(response => {
      this.provinces = response.body!;
      console.error("ppp", this.provinces)
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.commune.id;
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

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  saveEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if (this.commune) {
      if (this.commune.id) {
        this.communeService.update(this.commune).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'commune modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.communeService.create(this.commune).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'commune creer avec succès',
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

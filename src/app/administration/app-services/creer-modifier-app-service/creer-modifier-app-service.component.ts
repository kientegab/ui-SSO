import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService, IAppService } from 'src/app/shared/model/app-service';
import { IPrivilege, Privilege } from 'src/app/shared/model/privilege';
import { AppserviceService } from 'src/app/shared/service/app-service.service';
import { PrivilegeService } from 'src/app/shared/service/privilege.service';


@Component({
  selector: 'app-creer-modifier-app-service',
  templateUrl: './creer-modifier-app-service.component.html',
  styleUrls: ['./creer-modifier-app-service.component.scss']
})
export class CreerModifierAppServiceComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  appService: IAppService = new AppService();
  @Input() data: IAppService = new AppService();
  error: String | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;
  searchText: string | undefined;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private appServiceService: AppserviceService,
  ) {
  }

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.appService = cloneDeep(this.dynamicDialog.data);
    }
  }
  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.appService.id;
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
    if (this.appService) {
      if (this.appService.id) {
        this.appServiceService.update(this.appService).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'Application service modifié avec succès' });
             
            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.appServiceService.create(this.appService).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'Application service creer avec succès',
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

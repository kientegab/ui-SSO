import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService, IAppService } from 'src/app/shared/model/app-service';


@Component({
  selector: 'app-details-app-service',
  templateUrl: './details-app-service.component.html',
  styleUrls: ['./details-app-service.component.scss']
})
export class DetailsAppServiceComponent implements OnInit {

  appService: IAppService = new AppService();
  @Input() data: IAppService = new AppService();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.appService = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}


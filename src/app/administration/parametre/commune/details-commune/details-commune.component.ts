import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Commune, ICommune } from 'src/app/shared/model/commune.model';

@Component({
  selector: 'app-details-commune',
  templateUrl: './details-commune.component.html',
  styleUrls: ['./details-commune.component.scss']
})
export class DetailsCommuneComponent {
  commune: ICommune = new Commune();
  @Input() data: ICommune = new Commune();

  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.commune = cloneDeep(this.dynamicDialog.data);
    }
    }

    clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}
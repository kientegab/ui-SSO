import { Component, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProfil, Profil } from 'src/app/shared/model/profil';

@Component({
  selector: 'app-details-profil',
  templateUrl: './details-profil.component.html',
  styleUrls: ['./details-profil.component.scss']
})
export class DetailsProfilComponent {
  @Input() data:  IProfil = new Profil();

  profil: IProfil = new Profil();
  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialog:  DynamicDialogConfig,
) {}

  ngOnInit(): void {
    if (this.dynamicDialog.data) {
      this.profil = cloneDeep(this.dynamicDialog.data);
    }
  }

  clear(): void {
      this.dialogRef.close();
      this.dialogRef.destroy();
  }
}

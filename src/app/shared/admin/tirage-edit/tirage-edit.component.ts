import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tirage-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tirage-edit.component.html',
  styleUrl: './tirage-edit.component.css',
})
export class TirageEditComponent {
  @Input() tirage!: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  };

  editMode: boolean = false;
  tempTirage: any = {};

  ngOnInit() {
    this.tempTirage = { ...this.tirage };
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.tempTirage = { ...this.tirage };
    }
  }

  saveChanges() {
    this.tirage = { ...this.tempTirage };
    this.editMode = false;
  }

  navigatToManageParticipant(): void {
    //navigate to..
  }
}

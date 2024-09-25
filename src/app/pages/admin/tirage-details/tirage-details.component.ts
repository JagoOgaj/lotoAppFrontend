import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TirageEditComponent } from '../../../shared/admin/tirage-edit/tirage-edit.component';

@Component({
  selector: 'app-tirage-details',
  standalone: true,
  imports: [TirageEditComponent],
  templateUrl: './tirage-details.component.html',
  styleUrl: './tirage-details.component.css'
})
export class TirageDetailsComponent {
  
}

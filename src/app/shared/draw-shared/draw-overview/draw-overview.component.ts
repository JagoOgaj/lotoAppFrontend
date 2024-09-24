import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-draw-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-overview.component.html',
  styleUrl: './draw-overview.component.css',
})
export class DrawOverviewComponent {
  drawData: Array<{ label: string; value: string | number | Date }> = [
    { label: 'Date du Tirage', value: new Date() }, // Date
    { label: 'Montant Total', value: 10000 }, // Nombre
    { label: 'Nombre de Participants', value: 150 }, // Nombre
  ];

  isDate(value: any): value is Date {
    return value instanceof Date;
  }

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }
}

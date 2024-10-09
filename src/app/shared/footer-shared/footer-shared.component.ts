import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-shared',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer-shared.component.html',
  styleUrl: './footer-shared.component.css',
})
export class FooterSharedComponent {}

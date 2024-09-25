import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slide-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './slide-bar.component.html',
  styleUrl: './slide-bar.component.css',
})
export class SlideBarComponent {
  isSlideBarCollapsed = input.required<boolean>();
  setIsSlideBarCollapsed = output<boolean>();
  items = [
    {
      routerLink: 'tirage-list',
      icon: 'bi bi-list-ul',
      label: 'Listes des tirages',
    },
    {
      routerLink: 'account',
      icon: 'bi bi-play-fill',
      label: 'Compte',
    },
  ];

  toggleCollapse(): void {
    this.setIsSlideBarCollapsed.emit(!this.isSlideBarCollapsed());
  }

  closeSlideBar(): void {
    this.setIsSlideBarCollapsed.emit(true);
  }
}

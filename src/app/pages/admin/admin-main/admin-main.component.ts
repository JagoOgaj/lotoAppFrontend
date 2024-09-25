import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SlideBarComponent } from '../../../shared/admin/slide-bar/slide-bar.component';
import { RouterOutlet } from '@angular/router';
import { AdminContentComponent } from '../../../shared/admin/admin-content/admin-content.component';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [SlideBarComponent, RouterOutlet, AdminContentComponent],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css',
})
export class AdminMainComponent implements OnInit {
  isSlideBarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  ngOnInit(): void {
    this.isSlideBarCollapsed.set(this.screenWidth() < 768);
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isSlideBarCollapsed.set(true);
    }
  }

  changeIsSlideBarCollapsed(isSlideBarCollapsed: boolean): void {
    this.isSlideBarCollapsed.set(isSlideBarCollapsed);
  }
}

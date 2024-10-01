import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-admin-content',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './admin-content.component.html',
  styleUrl: './admin-content.component.css',
})
export class AdminContentComponent {
  isSlideBarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();
  sizeClass = computed(() => {
    const isSlideBarCollapsed = this.isSlideBarCollapsed();
    if (isSlideBarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });
}

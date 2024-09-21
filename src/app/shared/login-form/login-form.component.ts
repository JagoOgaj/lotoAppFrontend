import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() tabChange = new EventEmitter<string>();

  onTabChange(): void {
    this.tabChange.emit('registry');
  }
}

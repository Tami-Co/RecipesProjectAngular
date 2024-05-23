import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './register-comp.component.html',
  styleUrl: './register-comp.component.scss'
})
export class RegisterCompComponent {
  @Input() userData: { email: string, password: string } | null = null;
  ngOnInit() {
    if (this.userData) {
      console.log('User data received', this.userData);
    }
  }


}

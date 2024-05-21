

import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login-comp',
  standalone: true,
  templateUrl: './login-comp.component.html',
  styleUrl: './login-comp.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
})
export class LoginCompComponent {
  private userService = inject(UserService);
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  singIn(em: HTMLInputElement, password: HTMLInputElement) {
    this.userService
      .signIn({email:em.value,password: password.value})
      .subscribe((x) => {
        console.log('login', x);
        this.userService.token = x.token;
      })
  }
}

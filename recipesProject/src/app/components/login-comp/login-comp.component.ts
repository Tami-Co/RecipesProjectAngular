
import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { FormControl, Validators, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  standalone: true,
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    NgIf,
    JsonPipe
  ],
})
export class LoginCompComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  errorMessage = '';


  singIn(form: NgForm) {
    console.log("details", form.value.email, form.value.password);

    this.userService
      .signIn({ email: form.value.email.email, password: form.value.password })
      .subscribe({
        next: (x) => {
          console.log('login', x);
          this.userService.token = x.token;
         
          this.router.navigate(['/allRecipes']);

        },
        error: (err) => {
          console.error('Login error', err);
          // Handle the error appropriately
          this.errorMessage = 'אחד הפרטים שגויים, המשתמש לא נמצא';
        }
      });

  }


  moveToSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let navigationExtras: NavigationExtras = {
      state: {
        email: email.email,
        password: password
      }
    };
    this.router.navigate(['/signUp'], navigationExtras);
  }


}

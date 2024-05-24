import { JsonPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register-comp',
  standalone: true,
  imports: [NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  templateUrl: './register-comp.component.html',
  styleUrl: './register-comp.component.scss'
})
export class RegisterCompComponent implements OnInit {

  @Input() userData: { email: string, password: string } | null = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  errorMessage = '';
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    console.log("3", this.userData);
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
  ngOnInit() {
    if (this.userData) {
      console.log('User data received', this.userData);
    }
  }
  signUp(form: NgForm) {
    console.log("details", form.value.address.address, form.value.userName.userName, form.value.email.email, form.value.password);
    this.userService
      .signUp({ userName: form.value.userName.userName, email: form.value.email.email, password: form.value.password, address: form.value.address.address, role: 'user' })
      .subscribe({
        next: (x) => {
          console.log('signup', x);
          this.userService.token = x.token;
          this.router.navigate(['/allRecipes']);
        },
        error: (err) => {
          console.error('SignUp error', err);
          // Handle the error appropriately
          this.errorMessage = 'המשתמש כבר קיים במערכת ';
        }
      });
  }
}

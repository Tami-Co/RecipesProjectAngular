import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterCompComponent, LoginCompComponent, HttpClientModule, RouterModule, FormsModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipesProject';
  userService=inject(UserService)
  signUpData: { email: string, password: string } | null = null;

  onMoveToSignUp(data: { email: string, password: string }) {
    console.log("2",data);
    
    this.signUpData = data;
  }
}



import { Component, OnInit, inject } from '@angular/core';
import { NavigationExtras, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { User } from './shared/models/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, RouterOutlet, NgIf, RegisterCompComponent, MatTabsModule, LoginCompComponent, HttpClientModule, RouterModule, FormsModule, MatButtonModule, AllRecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipesProject';
  userService = inject(UserService)
  user: User = {};
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    if (this.userService.token) {
      console.log("oninit");

      this.userService.getUser().subscribe(
        {
          next: (data) => {
            this.user = data as User;
            console.log("user", this.user.userName);
          },
          error:
            (err) => {
              localStorage.removeItem('myToken')
            }
        }
      )
    }
  }
  onTabChange(event: any) {
    const index = event.tab.textLabel;
    console.log("index", index);

    switch (index) {
      case 'המתכונים שלנו':
        this.router.navigate(['/allRecipes']);
        break;
      case 'שיתוף מתכון':
        this.router.navigate(['/addRecipe']);
        break;
      case 'המתכונים שלי':
        this.router.navigate(['/myRecipes']);
        break;
      case 'התחברות':
        this.router.navigate(['/login']);
        break;
      case 'הרשמה':
        this.router.navigate(['/signUp']);
        break;
      case 'התנתקות':
        this.logout();
        break;
      default:
        this.router.navigate(['/']);

    }
  }
  logout() {
    localStorage.removeItem('myToken')
   
     this.user.userName=''
    this.router.navigate(['/allRecipes']);

  }
}



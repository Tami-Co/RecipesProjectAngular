import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf,RegisterCompComponent,MatTabsModule, LoginCompComponent, HttpClientModule, RouterModule, FormsModule,MatButtonModule,AllRecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipesProject';
  userService=inject(UserService)
  constructor(private router: Router) {
    
  }
  onTabChange(event: any) {
    const index = event.tab.textLabel;
    console.log("index",index);
    
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
    // this.userService.logout();
    this.router.navigate(['/login']);
  }

  

}



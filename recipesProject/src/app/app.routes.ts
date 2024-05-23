import { Routes } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';

export const routes: Routes = [
    { path: 'login', component: LoginCompComponent },
    { path: 'signUp', component: RegisterCompComponent },
    { path: 'allRecipes', component: AllRecipesComponent }
    // { path: 'login', component: LoginCompComponent }
    // { path: 'login', component: LoginCompComponent }
];

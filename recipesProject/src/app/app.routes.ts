import { Routes } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginCompComponent },
    { path: 'signUp', component: RegisterCompComponent },
    { path: 'allRecipes', component: AllRecipesComponent },
    { path: 'addRecipe', component: RecipeFormComponent }
    // { path: 'login', component: LoginCompComponent }
];

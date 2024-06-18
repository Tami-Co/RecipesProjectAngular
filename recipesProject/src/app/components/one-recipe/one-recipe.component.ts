import { Component, Input, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';
import { NavigationExtras, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [MatSnackBarModule, MatCardModule, MatButtonModule, NgIf],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent implements OnInit {
  @Input('oneItem') recipe: Recipe = {}
  @Input() sourceComponent: string = '';
  private snackBar = inject(MatSnackBar);

  private router = inject(Router);
  private userService = inject(UserService);
  private recipeService = inject(RecipeService);
  userConnect: boolean = false;
  ngOnInit(): void {
    if (this.userService.token) {
      this.userConnect = true;
    }
    console.log("comp", this.sourceComponent);

  }
  viewRecipe() {
    console.log("aa", this.recipe._id);
    this.router.navigate([`recipe-details/${this.recipe._id}`])
  }
  updateRecipe() {
    let navigationExtras: NavigationExtras = {
      state: {
        recipe: this.recipe,
      }
    };
    this.router.navigate(['/updateRecipe'], navigationExtras);

  }


  deleteRecipe() {
    const snackBarRef = this.snackBar.open('את/ה בטוח שברצונך להסיר את המתכון?', 'כן', {
      duration: 7000,
    });

    snackBarRef.onAction().subscribe(() => {
      if (this.recipe._id) {
        this.recipeService.deleteRecipe(this.recipe._id).subscribe({
          next: (x) => {
            window.location.reload();
          },
          error: (err) => {
            console.error('delete recipe error', err);
          }
        });
      } else {
        console.error('Recipe ID is null or undefined');
      }
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
      // Optional: Do something if the snackbar is dismissed without action
    });
  }


}

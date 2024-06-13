import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StarLevelDirective } from '../../shared/directives/star-level.directive';
import { TimeFormatPipePipe } from '../../shared/pipes/time-format-pipe.pipe';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NgFor,
    MatIconModule,
    StarLevelDirective,
    TimeFormatPipePipe,
    DatePipe
  ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: string | null;
  recipe: Recipe = {};
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private userService = inject(UserService);
  userId: string = '';
  sameUser: boolean = false;
  constructor(private route: ActivatedRoute) {
    this.recipeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.userId = data._id as any;
      console.log("id user", this.userId);

    })

    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe((data) => {
        this.recipe = data as Recipe;
        console.log("rec", this.recipe);
        if (this.recipe.user?.id == this.userId) {
          this.sameUser = true;
        }
      });
    } else {
      console.error('Recipe ID is null or undefined');
    }

  }

  deleteRecipe() {
    if (this.recipeId) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe({
        next: (x) => {
          this.router.navigate(['/allRecipes']);
        },
        error: (err) => {
          console.error('delete recipe error', err);
        }
      });
    } else {
      console.error('Recipe ID is null or undefined');
    }
  }
}

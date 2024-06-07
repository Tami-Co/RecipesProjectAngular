import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LevelDirectiveDirective } from '../../shared/directives/level-directive.directive';
import { TimeFormatPipePipe } from '../../shared/pipes/time-format-pipe.pipe';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NgFor,
    MatIconModule,
    LevelDirectiveDirective,
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
  private recipesService = inject(RecipeService);

  constructor(private route: ActivatedRoute) {
    this.recipeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.recipeId) {
      this.recipesService.getRecipeById(this.recipeId).subscribe((data) => {
        this.recipe = data as Recipe;
      });
    } else {
      console.error('Recipe ID is null or undefined');
    }
  }

  deleteRecipe() {
    if (this.recipeId) {
      this.recipesService.deleteRecipe(this.recipeId).subscribe({
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

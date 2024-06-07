import { Component, Input, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent {
  @Input('oneItem')
  recipe: Recipe = {}
  private router = inject(Router);

  details() {
    console.log("aa", this.recipe._id);
    this.router.navigate([`recipe-details/${this.recipe._id}`])
  }
}

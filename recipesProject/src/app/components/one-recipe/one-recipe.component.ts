import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';

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



}

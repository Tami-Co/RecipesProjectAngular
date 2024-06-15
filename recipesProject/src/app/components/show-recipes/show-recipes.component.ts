import { Component, Input, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Router } from '@angular/router';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../shared/services/category.service';
import { NgFor, NgIf } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [MatGridListModule, MatPaginatorModule, NgIf, OneRecipeComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatPaginatorModule, NgFor, ShowRecipesComponent],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.scss'
})
export class ShowRecipesComponent {
  @Input() recipes: any[] = [];
  @Input() fromComp: string = '';
}

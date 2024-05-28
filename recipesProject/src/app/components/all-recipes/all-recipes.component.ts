import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Router } from '@angular/router';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../shared/services/category.service';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [OneRecipeComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  private recipesService = inject(RecipeService);
  private categoriesService = inject(CategoryService);
  private router = inject(Router);
  listRecipes: any[] = [];
  listCategories: any[] = [];
  recipesOfCategory: any[] = [];
  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
    this.categoriesService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
      console.log("2",data);
    })
  }
  filterCategory(categoty: string) {
    this.categoriesService.getCategoryByName(categoty).subscribe((data) => {
      this.recipesOfCategory = data as any[];
      console.log(data);
    })
  }

}

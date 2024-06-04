import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Router } from '@angular/router';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../shared/services/category.service';
import { NgFor, NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [MatPaginatorModule, NgIf, OneRecipeComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatPaginatorModule
  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  private recipesService = inject(RecipeService);
  private categoriesService = inject(CategoryService);
  private router = inject(Router);
  flag: Boolean = false;
  listRecipes: any[] = [];
  levels: number = 5;
  listCategories: any[] = [];
  recipesOfCategory: {} = {};
  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
    this.categoriesService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
      console.log("2", data);
    })
  }

  filterByCategory(category: string) {
    this.categoriesService.getCategoryByName(category).subscribe((data) => {
      this.recipesOfCategory = data as any[];
      this.listRecipes = data.recipes as any ?? [];
      console.log("cat", data);
    });
  }


  filterByLevel(level: number) {

    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      this.listRecipes = this.listRecipes.filter((x) => x.level == level);;

      console.log(data);

    })
  }
  filterByTime(time: number) {
    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
    this.recipesService.getRecipesByTime(time).subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
  }
  cancleFilter() {
    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
  }

  onPageChange(event: PageEvent) {
    if (event.previousPageIndex !== undefined) {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = event.pageIndex * event.pageSize;
      if (event.pageIndex > event.previousPageIndex) {
        this.onNextPage(endIndex);
      } else if (event.pageIndex < event.previousPageIndex) {
        this.onPreviousPage(startIndex);
      }
    }
  }

  onNextPage(endIndex: number) {
    console.log('Next page clicked, starting item:', endIndex);
    let page = (endIndex / 12) + 1;
    console.log("page", page);

    this.recipesService.getRecipes(page).subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);
      if (this.listRecipes.length == 0) {
        console.log("recipes finished");
        this.flag = true
      }

    })

  }

  onPreviousPage(startIndex: number) {

    console.log('Previous page clicked, starting item:', startIndex);
    let page = (startIndex / 12) + 1;

    this.recipesService.getRecipes(page).subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);

    })
    if (this.flag === true) {
      this.flag = false;
    }

  }
}



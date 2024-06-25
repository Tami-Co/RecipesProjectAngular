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
import { MatGridListModule } from '@angular/material/grid-list';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [MatGridListModule, NgIf, MatSelectModule, MatPaginatorModule, NgFor, ShowRecipesComponent, OneRecipeComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  private recipesService = inject(RecipeService);
  private categoriesService = inject(CategoryService);
  private router = inject(Router);
  without_filters: boolean = true;
  flag: Boolean = false;
  listRecipes: any[] = [];
  levels: number = 5;
  listCategories: any[] = [];
  recipesOfCategory: {} = {};
  selectedCategory: string = '';
  selectedLevel: number = 0;
  selectedTime: number = 0;
  lengthRecipes: number = 0

  ngOnInit(): void {

    this.recipesService.getRecipes().subscribe((data) => {
      this.listRecipes = data as any[];
      console.log(data);
    });
    this.categoriesService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
      console.log("2", data);
    });
    const page = 'all'

    this.recipesService.getRecipes(page).subscribe((data) => {
      this.lengthRecipes = data.length
      console.log("lengg", this.lengthRecipes);

    })

  }

  filterByCategory(category: string) {
    this.without_filters = false;
    this.selectedCategory = category;
    const page = 'all'

    this.recipesService.getRecipes(page).subscribe((data) => {
      this.listRecipes = data as any[];
      if (this.selectedLevel !== 0) {
        if (this.selectedTime !== 0) {
          this.listRecipes = this.listRecipes.filter((x) => x.categories.some((cat: any) => cat.description === this.selectedCategory) && x.level == this.selectedLevel && x.preparationTime <= this.selectedTime)

        }
        else {
          this.listRecipes = this.listRecipes.filter((x) => x.categories.some((cat: any) => cat.description === this.selectedCategory) && x.level == this.selectedLevel)

        }
      }
      else {
        if (this.selectedTime !== 0) {
          this.listRecipes = this.listRecipes.filter((x) => x.categories.some((cat: any) => cat.description === this.selectedCategory) && x.preparationTime <= this.selectedTime)

        }
        else {

          this.listRecipes = this.listRecipes.filter((x) => x.categories.some((cat: any) => cat.description === this.selectedCategory))
        }
      }
    });
  }


  filterByLevel(level: number) {

    this.without_filters = false;
    const page = 'all'
    this.selectedLevel = level;
    this.recipesService.getRecipes(page).subscribe((data) => {
      this.listRecipes = data as any[];
      if (this.selectedTime !== 0) {
        if (this.selectedCategory !== '') {
          console.log("Level1", this.selectedTime, this.selectedCategory);

          this.listRecipes = this.listRecipes.filter((x) => x.level == level && x.preparationTime <= this.selectedTime && x.categories.some((cat: any) => cat.description === this.selectedCategory));
          console.log("Level11", this.listRecipes);

        }

        else {
          console.log("Level2", this.selectedTime);

          this.listRecipes = this.listRecipes.filter((x) => x.level == level && x.preparationTime <= this.selectedTime);
        }


      }
      else {
        if (this.selectedCategory !== '') {
          console.log("Level3", this.selectedCategory);

          this.listRecipes = this.listRecipes.filter((x) => x.level == level && x.categories.some((cat: any) => cat.description === this.selectedCategory));
          console.log("Level33", this.listRecipes);

        }
        else {
          console.log("Level4-onlyLevel");

          this.listRecipes = this.listRecipes.filter((x) => x.level == level);

        }

      }

      console.log(data);

    })
  }
  filterByTime(time: number) {

    this.without_filters = false;
    this.selectedTime = time;

    this.recipesService.getRecipesByTime(time).subscribe((data) => {
      this.listRecipes = data as any[];
      if (this.selectedLevel !== 0) {
        if (this.selectedCategory !== '') {
          console.log("Time1", this.selectedLevel, this.selectedCategory);

          this.listRecipes = this.listRecipes.filter((x) => x.level == this.selectedLevel && x.categories.some((cat: any) => cat.description === this.selectedCategory))
        }
        else {
          console.log("Time2", this.selectedLevel);

          this.listRecipes = this.listRecipes.filter((x) => x.level == this.selectedLevel)
        }

      }
      else {
        if (this.selectedCategory !== '') {
          console.log("Time3", this.selectedCategory);
          this.listRecipes = this.listRecipes.filter((x) => x.categories.some((cat: any) => cat.description === this.selectedCategory))
        }
      }
      console.log(data);

    })
  }
  cancleFilter() {
    this.without_filters = true;
    this.selectedCategory = '';
    this.selectedLevel = 0;
    this.selectedTime = 0;

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



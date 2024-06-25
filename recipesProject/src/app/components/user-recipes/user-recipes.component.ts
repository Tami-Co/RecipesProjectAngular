
import { MatGridListModule } from '@angular/material/grid-list';
import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';
@Component({
  selector: 'app-user-recipes',
  standalone: true,
  imports: [MatGridListModule, MatPaginatorModule, NgIf, OneRecipeComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatPaginatorModule, NgFor, ShowRecipesComponent],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.scss'
})
export class UserRecipesComponent implements OnInit {
  private recipesService = inject(RecipeService);
  private userService = inject(UserService);
  user: User = {};
  listRecipes: any[] = [];
  isFinished: boolean = false;
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe((data) => {
      this.user = data as User;
      console.log("id", this.user._id);

      if (this.user._id !== undefined) {
        console.log("enter");

        this.recipesService.getRecipesOfUser(this.user._id).subscribe((data) => {
          this.listRecipes = data as any[];
          this.isFinished = true;

          console.log("bb", this.listRecipes);
        });
      }
      else {
        this.isFinished = true;
      }
    });
  }
}

















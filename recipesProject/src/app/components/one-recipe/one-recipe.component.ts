import { Component, Input, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';
import { NavigationExtras, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent implements OnInit {
  @Input('oneItem') recipe: Recipe = {}
  @Input() sourceComponent: string = '';

  private router = inject(Router);
  private userService = inject(UserService);
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

  }
}

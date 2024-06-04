import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../shared/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../shared/services/recipe.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf } from '@angular/common';

import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [NgFor, MatDividerModule, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule, MatCheckboxModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private recipeService = inject(RecipeService);
  listCategories: any[] = [];
  isAdd: boolean = false;
  categoy2: any[] = [];
  hasCategory: boolean = false;
  constructor(private fb: FormBuilder) {
    this.recipeForm = fb.group({
      name: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
      description: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(200), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
      category: fb.control(''),
      newCategory: fb.control('', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
      preparationTime: fb.control(0, [Validators.required, Validators.maxLength(3)]),
      level: fb.control('', Validators.required),
      // layersCake: fb.array([
      //   fb.group({
      //     description: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
      //     ingredients: fb.array([
      //       fb.control('', Validators.required),]),
      //   }),
      // ]),
      layersCake: fb.array([]),
      instructions: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(10000)]),
      // לבדוק אם חובה!!!!!!!!!!!!!!!!!!!
      img: fb.control(''),
      isPrivate: fb.control(false, Validators.required),

    })
    this.addLayer();
  }
  get layersCake(): FormArray {
    return this.recipeForm.controls['layersCake'] as FormArray;
  }

  getIngredients(layerIndex: number): FormArray {
    return (this.layersCake.at(layerIndex) as FormGroup).controls['ingredients'] as FormArray;
  }
  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
    })

  }


  addLayer() {

    console.log("addLayer");
    this.layersCake.push(
      this.fb.group({
        description: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
        ingredients: this.fb.array([
          this.fb.control('', Validators.required),
        ]),
      })
    );

  }
  addingredient(layerIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    if (ingredients.at(ingredients.length - 1).value !== '') {
      ingredients.push(this.fb.control('', Validators.required));
    }
  }
  addRecipe() {
    console.log("addrec");

    if (this.recipeForm.value.category !== null) {
      if (this.recipeForm.value.newCategory !== '') {
        this.recipeForm.value.category.push(this.recipeForm.value.newCategory)
      }
    }
    else {
      this.recipeForm.value.category = this.recipeForm.value.newCategory
    }


    this.recipeForm.value.category.forEach((item: any) => {
      let obj = { "description": item };
      this.categoy2.push(obj);
    });
    this.recipeForm.value.category = this.categoy2;
    console.log("rec", this.recipeForm.value);

    this.recipeService
      .addRecipe({
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        categories: this.recipeForm.value.category,
        preparationTime: this.recipeForm.value.preparationTime,
        level: this.recipeForm.value.level,
        dateAdded: new Date(),
        layersCake: this.recipeForm.value.layersCake,
        // layersCake: [{ description: "Layer 1", ingredients: ["Ingredient 1"] }],
        instructions: this.recipeForm.value.instructions,
        img: this.recipeForm.value.img,
        isPrivate: this.recipeForm.value.isPrivate,
        user: { id: '663e0b1761331d51708c7415', nameUser: 'Moshe' },
      })
      .subscribe({
        next: (x) => {
          console.log('addRec', x);
          this.isAdd = true;
          setTimeout(() => {
            this.router.navigate(['/allRecipes']);
          }, 3000);
        },
        error: (err) => {
          console.error('add recipe  error', err);
        }
      });
  }
}





import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [MatDividerModule, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule, MatCheckboxModule],
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

  constructor(fb: FormBuilder) {
    this.recipeForm = fb.group({
      name: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\s]+$")]),
      description: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(200), Validators.pattern("^[a-zA-Z0-9א-ת\s]+$")]),
      category: fb.array(
        // לבדוק מה לעשות עם זה
        []
      ),
      preparationTime: fb.control('', [Validators.required, Validators.maxLength(3)]),
      level: fb.control('', Validators.required),
      layersCake: fb.array([
        fb.group({
          description: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern("^[a-zA-Zא-ת\s]+$")]),
          // בדיקות תקינות!!!!!!!!!!!!!!!!!!!!!
          ingredients: fb.array([]),
        }),
      ]),
      instructions: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(10000)]),
      // לבדוק אם חובה!!!!!!!!!!!!!!!!!!!
      img: fb.control(''),
      isPrivate: fb.control('', Validators.required),

    })
    this.addLayer();
  }
  get category(): FormArray {
    return this.recipeForm.controls['category'] as FormArray;
  }
  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
    })
  }

  addRecipe() {
    console.log("rec", this.recipeForm.value);

    this.recipeService
      .addRecipe({
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        categories: [{ description: "cat 1" }],
        preparationTime: this.recipeForm.value.preparationTime,
        level: this.recipeForm.value.level,
        dateAdded: new Date(),
        layersCake: [{ description: "Layer 1", ingredients: ["Ingredient 1"] }],
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
  addLayer() {

    // this.category.push(
    //  this.fb.group({
    //     name: this.fb.control('', Validators.minLength(3)),
    //     age: this.fb.control(0, [Validators.min(0), Validators.max(120)]),
    //   })
    // );

    console.log(this.recipeForm);
  }
}





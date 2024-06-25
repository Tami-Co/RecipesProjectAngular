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
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { Category } from '../../shared/models/category';
import { Recipe } from '../../shared/models/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [MatSnackBarModule, NgFor, MatDividerModule, NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule, MatCheckboxModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private recipeService = inject(RecipeService);
  listCategories: any[] = [];
  categoy2: any[] = [];
  hasCategory: boolean = false;
  recipeToUpdate: Recipe = {};
  updateRec: Recipe = {};
  update: boolean = false;
  private snackBar = inject(MatSnackBar);
  isFinished: boolean = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { recipe: Recipe };

    if (state) {
      this.recipeToUpdate = state.recipe;
      this.updateRec = this.recipeToUpdate
      this.isFinished = true;
      this.update = true;
      console.log("recipeToUpdate", this.updateRec);
    }
    else {
      console.log("else", this.recipeToUpdate);

      this.isFinished = true;
    }
    this.recipeForm = fb.group({
      name: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\\s.,&*!@#$']+$")]),
      description: fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(200), Validators.pattern("^[a-zA-Zא-ת\\s.,&*!@#$']+$")]),
      category: fb.control(''),
      newCategory: fb.control('', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
      preparationTime: fb.control(0, [Validators.required, Validators.maxLength(3)]),
      level: fb.control('', Validators.required),
      layersCake: fb.array([]),
      instructions: fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]),
      img: fb.control(''),
      isPrivate: fb.control(false),


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
    console.log("updatee", this.recipeToUpdate);

    this.categoryService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
    })
    if (this.recipeToUpdate) {
      this.populateForm(this.recipeToUpdate);
      console.log("vvv", this.recipeForm.value);

    }

  }

  populateForm(recipe: Recipe) {
    this.recipeForm.patchValue({
      name: recipe.name,
      description: recipe.description,
      category: recipe.categories?.map(c => c.description),
      preparationTime: recipe.preparationTime,
      level: recipe.level,
      instructions: recipe.instructions,
      img: recipe.img,
      isPrivate: recipe.isPrivate
    });

    const layersArray = this.recipeForm.get('layersCake') as FormArray;
    recipe.layersCake?.forEach(layer => {
      layersArray.push(this.fb.group({
        description: [layer.description, Validators.required],
        ingredients: this.fb.array(layer.ingredients.map(ingredient => this.fb.control(ingredient, Validators.required)))
      }));
    });
  }
  addLayer() {
    this.layersCake.push(
      this.fb.group({
        description: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
        ingredients: this.fb.array([this.fb.control('', Validators.required),]),
      })
    );

  }
  addingredient(layerIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    if (ingredients.at(ingredients.length - 1).value !== '') {
      ingredients.push(this.fb.control(''));
    }
  }

  addRecipe() {
    console.log("addRecipe", this.recipeForm.value);


    this.recipeForm.value.layersCake.forEach((layer: any) => {
      const ingredients = layer.ingredients;

      for (let i = ingredients.length - 1; i >= 0; i--) {
        if (ingredients[i] === '') {
          ingredients.splice(i, 1);
        }
      }
    });
    let objects: any[] = [];
    if (this.recipeForm.value.category && this.recipeForm.value.newCategory) {
      this.recipeForm.value.category.push(this.recipeForm.value.newCategory)
      console.log(this.recipeForm.value.category, "נכנס!");
    }
    else {
      if (!this.recipeForm.value.category) {
        this.recipeForm.value.category = [];
        this.recipeForm.value.category.push(this.recipeForm.value.newCategory)
        console.log(this.recipeForm.value.category, "מערך!");
      }
    }


    this.recipeForm.value.category.forEach((item: any) => {
      let obj = { "description": item };
      objects.push(obj);
    });
    this.recipeForm.value.category = objects;
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
        instructions: this.recipeForm.value.instructions,
        img: this.recipeForm.value.img,
        isPrivate: this.recipeForm.value.isPrivate || false,
      })
      .subscribe({
        next: (x) => {
          console.log('addRec', x);


          setTimeout(() => {
            this.openSnackBar('!המתכון הוסף בהצלחה', 'סגור');
            this.router.navigate(['/allRecipes']);
          }, 3000);
        },
        error: (err) => {
          console.error('add recipe  error', err);
          this.openSnackBar('שגיאה', 'סגור');
        }
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  updateRecipe() {
    console.log("updateRecipe");

    if (this.recipeForm.value.layersCake.length > 0) {
      const firstLayer = this.recipeForm.value.layersCake[0];
      const isFirstLayerEmpty = !firstLayer.description && firstLayer.ingredients.every((ingredient: string) => ingredient === '');
      if (isFirstLayerEmpty) {
        this.recipeForm.value.layersCake.splice(0, 1);
      }
    }

    if (this.recipeForm.value.newCategory && this.recipeForm.value.category) {
      this.recipeForm.value.category.push(this.recipeForm.value.newCategory);
    } else {
      if (!this.recipeForm.value.category) {
        this.recipeForm.value.category = [this.recipeForm.value.newCategory];
      }
    }

    this.recipeForm.value.layersCake.forEach((layer: any) => {
      const ingredients = layer.ingredients;
      for (let i = ingredients.length - 1; i >= 0; i--) {
        if (ingredients[i] === '') {
          ingredients.splice(i, 1);
        }
      }
    });

    this.recipeForm.value.category.forEach((item: any) => {
      let obj = { "description": item };
      this.categoy2.push(obj);
    });
    this.recipeForm.value.category = this.categoy2;
    console.log("rec", this.recipeForm.value);

    if (this.recipeToUpdate && this.recipeToUpdate._id) {
      this.recipeService.updateRecipe({
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        categories: this.recipeForm.value.category,
        preparationTime: this.recipeForm.value.preparationTime,
        level: this.recipeForm.value.level,
        dateAdded: new Date(),
        layersCake: this.recipeForm.value.layersCake,
        instructions: this.recipeForm.value.instructions,
        img: this.recipeForm.value.img,
        isPrivate: this.recipeForm.value.isPrivate,
      }, this.recipeToUpdate._id).subscribe({
        next: (x) => {
          console.log('addRec', x);

          setTimeout(() => {
            this.openSnackBar('!המתכון התעדכן בהצלחה', 'סגור');
            this.router.navigate(['/myRecipes']);
          }, 3000);
        },
        error: (err) => {
          console.error('add recipe error', err);
          this.openSnackBar('שגיאה', 'סגור');
        }
      });
    } else {
      console.error('Recipe ID is undefined');
      this.openSnackBar('שגיאה: מזהה המתכון אינו מוגדר', 'סגור');
    }
  }
}






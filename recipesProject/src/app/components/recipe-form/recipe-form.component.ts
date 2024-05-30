import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../shared/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule, MatCheckboxModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  private categoryService = inject(CategoryService);
  listCategories: any[] = []
  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.listCategories = data as any[];
    })
  }
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50), Validators.pattern("^[a-zA-Zא-ת\s]+$")]),
    description: new FormControl('', [Validators.required, Validators.min(2), Validators.max(200), Validators.pattern("^[a-zA-Z0-9א-ת\s]+$")]),
    category: new FormArray([
      // לבדוק מה לעשות עם זה
      // categoryName: new FormControl('', [Validators.required, Validators.min(2), Validators.max(70), Validators.pattern("^[a-zA-Zא-ת\s]+$")]),

    ]),
    preparationTime: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    layersCake: new FormArray([
      new FormGroup({
        description: new FormControl('', [Validators.required, Validators.min(2), Validators.max(70), Validators.pattern("^[a-zA-Zא-ת\s]+$")]),
        // בדיקות תקינות!!!!!!!!!!!!!!!!!!!!!
        ingredients: new FormArray([]),
      }),
    ]),

    instructions: new FormControl('', [Validators.required, Validators.min(2), Validators.max(10000)]),
    // לבדוק אם חובה!!!!!!!!!!!!!!!!!!!
    img: new FormControl(''),
    isPrivate: new FormControl('', Validators.required),






  })
}

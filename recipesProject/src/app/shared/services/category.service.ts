import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiURL}/categories`

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }
  getCategoryByName(name: string) {
    return this.http.get<Category>(`${this.baseUrl}/${name}`);
  }
  getCategorieswithRecipes() {
    return this.http.get<Category[]>(this.baseUrl);
  }
}

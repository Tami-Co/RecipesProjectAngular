import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/categories';

  constructor(private http:HttpClient) { 

  }
  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }
  getCategoryByName(name:string) {
    return this.http.get<Category[]>(`${this.baseUrl}/:${name}`);
  }
  getCategorieswithRecipes() {
    return this.http.get<Category[]>(this.baseUrl);
  }
}

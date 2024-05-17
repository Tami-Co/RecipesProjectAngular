import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:5000/recipes'
  constructor(private http: HttpClient) {

  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  getRecipeById(id: number) {
    return this.http.get<Recipe[]>(`${this.baseUrl}/${id}`);
  }

  getRecipesOfUser(id: number) {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipesUser/${id}`);
  }

  getRecipesByTime(time: number) {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipesByTime/${time}`);
  }

  addRecipes(r: Recipe) {
    return this.http.post<Recipe>(`${this.baseUrl}`, r);
  }
  //לבדוק אם טוב ככה לשרשר את הID
  updateRecipes(r: Recipe) {
    return this.http.put<Recipe>(`${this.baseUrl}/${r.id}`, r);
  }
  deleteRecipes(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}

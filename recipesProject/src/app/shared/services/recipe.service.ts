import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiURL}/recipes`

  // getRecipes() {
  //   return this.http.get<Recipe[]>(this.baseUrl);
  // }
  getRecipes(page?: number) {
    let params = new HttpParams();
    
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }

    return this.http.get<Recipe[]>(this.baseUrl, { params });
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

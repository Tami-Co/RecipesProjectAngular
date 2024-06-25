import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiURL}/recipes`

  public get token(): string | null {
    return localStorage.getItem('myToken');
  }
  // getRecipes() {
  //   return this.http.get<Recipe[]>(this.baseUrl);
  // }
  getRecipes(page?: number | string) {
    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }

    return this.http.get<Recipe[]>(this.baseUrl, { params });
  }
  getRecipeById(id: string) {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  getRecipesOfUser(id: string) {
    console.log("getRecipesOfUser");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    return this.http.get<Recipe[]>(`${this.baseUrl}/recipesUser/${id}`,httpOptions);
  }

  getRecipesByTime(time: number) {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipesByTime/${time}`);
  }

  addRecipe(r: Recipe) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    return this.http.post<Recipe>(`${this.baseUrl}`, r, httpOptions);
  }
  //לבדוק אם טוב ככה לשרשר את הID
  updateRecipe(r: Recipe,id:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, r,httpOptions);
  }
  
  deleteRecipe(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.delete(`${this.baseUrl}/${id}`, httpOptions);
  }
  delete_Recipe(id:number){
    console.log(id);
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`);    
  }
}

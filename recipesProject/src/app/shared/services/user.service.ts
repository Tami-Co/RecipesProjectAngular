import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private usersURL = `${environment.apiURL}/users`

  public get token(): string | null {
    return localStorage.getItem('myToken');
  }
  public set token(token: string | null) {
    if (token) {
      localStorage.setItem('myToken', token);
    }
  }

  getUsers() {
    return this.http.get<User[]>(this.usersURL)
  }
  signUp(u: User) {
    return this.http.post<User>(`${this.usersURL}/signup`, u)
  }
  signIn(u:User) {
    return this.http.post<{user:User;token:string}>(`${this.usersURL}/signin`,u)
  }
}

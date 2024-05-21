import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl='http://localhost:5000/users'
  constructor(private http:HttpClient) { 

  }
  getUsers(){
    return this.http.get<User[]>(this.baseUrl)
  }
  signUp(u:User){
    return this.http.post<User>(`${this.baseUrl}/signup`,u)
  }
  signIn(email:string,password:string){
    return this.http.post<User>(`${this.baseUrl}/signin`,{email,password})
  }
}

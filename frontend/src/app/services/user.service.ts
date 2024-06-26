import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, ) {
    this.userObservable = this.userSubject.asObservable();
  }
public get currentUser():User{
  return this.userSubject.value
}
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          // this.toastr.success(
          //   `welcome to Foodmine ${user.name}`,
          //   'Login Successful'
          // )
          alert( `welcome to Foodmine ${user.name},
            'Login Successful'`)

        },
        error: (errorResponse) => {
          // this.toastr.error(errorResponse.error, 'Login failed')
          alert(`${errorResponse.error}, 'Login failed'`)
        }
      }))
  }



  register(userRegister:IUserRegister):Observable<User>{
return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
  tap({
    next: (user) =>{
      this.setUserToLocalStorage(user);
      this.userSubject.next(user);
      // this.toastr.success(
       
      // )
      alert(` welcome to the Foodmine ${user.name}
      'Register Successfully...!'`)
    },
    error:(error) =>{
      // this.toastr.error(error.error, 'Register failed')
    }
  })
)
  }


  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user:User){
localStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}

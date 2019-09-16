import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {
   createUser(user: User) {
     console.log('login_email Email: ' + user.login_email);
   }
} 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  showLoginPassword: boolean;
  showNewPassword: boolean;
  showRepeatPassword:boolean;
  display_error_popup='none';
  display_forgot_password_popup='none';
  display_forgot_password_error_popup='none;'
  isEmail: boolean;
  isForgotPassword: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  loginForm = this.formBuilder.group({ 
    login_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    login_password: ['', Validators.required]
  });

  forgotPasswordForm = this.formBuilder.group({ 
    forgotPassword_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    new_password: ['', Validators.required],
    repeat_password: ['', Validators.required]
  });

  constructor( private router: Router,
               private formBuilder:FormBuilder ) {
    this.showLoginPassword = false;
    this.showNewPassword = false;
    this.showRepeatPassword = false;
  }

  ngOnInit() { }

  loginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }
  newPassword(){
    this.showNewPassword = !this.showNewPassword;
  }
  repeatPassword(){
    this.showRepeatPassword = !this.showRepeatPassword;
  }
  onClickSubmit(data) {
    if(data.login_email){
      if(data.login_email.match(this.emailPattern)) {
        this.isEmail = true;
        if(data.login_password) {
          this.router.navigateByUrl('/home');
        }
        else {
          this.display_error_popup='block';
        }
      } else {
        this.isEmail = false;
        this.display_error_popup='block';
      }
    } else {
      this.isEmail = false;
      this.display_error_popup='block';
    }
 }
 
  emailEnter(data){
    if(data.login_email){
      if(data.login_email.match(this.emailPattern)) {
        this.display_forgot_password_popup = 'block';
      } 
      else {
        this.isForgotPassword = true;
        this.display_forgot_password_error_popup='block';
      }
    }else {
      this.isForgotPassword = false;
      this.display_forgot_password_error_popup='block';
    }
  }

  closeModalDialog(){
    this.display_error_popup='none';
    this.display_forgot_password_popup = 'none';
    this.display_forgot_password_error_popup = 'none';
  }
  
  onResetPassword(data){
    if(data.forgotPassword_email && data.new_password && data.repeat_password){
      if(data.forgotPassword_email.match(this.emailPattern)){
        if(data.new_password == data.repeat_password){
          this.display_forgot_password_popup = 'none';
          this.router.navigateByUrl('/home');
        } 
      } 
    }
  }
 
}
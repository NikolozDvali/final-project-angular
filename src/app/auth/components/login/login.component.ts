import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ){}

  login(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    if(!email || !password){
      return;
    }
    this.loginService.tryLogin(email, password).subscribe(
      (loginResponse)=>{
        console.log(loginResponse);
      }
    );
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
}

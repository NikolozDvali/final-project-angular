import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorsService } from '../../services/custom-validators/custom-validators.service';
import { Account } from 'src/app/shared/interfaces';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private registerService: RegisterService
  ) {}

  register(){
    const account = this.registerForm.value;
    this.registerForm.reset();
    this.registerService.register(account);
  }

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    username: ['', Validators.required],
    status: ['Student', Validators.required]
  }, [this.customValidators.passwordMatchValidator]);

}

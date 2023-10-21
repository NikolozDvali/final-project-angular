import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AccountDataService } from 'src/app/shared/services/accountData/account-data.service';
import { ClassroomService } from 'src/app/shared/services/classroom/classroom.service';

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
    private loginService: LoginService,
    private accountService: AccountDataService,
    private router: Router,
    private classroomService: ClassroomService
  ){}

  login(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginForm.reset();
    
    if(!email || !password){
      return;
    }
    this.loginService.tryLogin(email, password).subscribe(
      (response)=>{
        if(response == undefined){
          this.showErrorMessage = true;
        }else{
          this.accountService.setLoggedInAccout(response);
          this.showErrorMessage = false;
          const cls = response.account_classes[0];
          this.classroomService.setSelectedClassId(cls.class_id);
          this.router.navigate(['/main/'+cls.class_name+'/posts'])
        }
      }
    );
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
}

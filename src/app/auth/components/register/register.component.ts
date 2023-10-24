import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegisterComponent {
  showAccountExistsError = false;

  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private registerService: RegisterService,
    private cdr: ChangeDetectorRef
  ) {}

  register(){
    const {repeatPassword, ...accountTempte} = this.registerForm.value;

    const account: Account = {
      account_email: accountTempte.email,
      account_name: accountTempte.username,
      account_password: accountTempte.password,
      account_type: accountTempte.status,
      account_classes: []
    }

    this.registerForm.reset();
    this.registerService.register(account).subscribe(
      (registered)=>{
        if(registered){
          this.showAccountExistsError = false;
        }else{
          this.showAccountExistsError = true;
        }
        this.cdr.markForCheck();
      }
    );
  }

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    username: ['', Validators.required],
    status: ['Student', Validators.required]
  }, [this.customValidators.passwordMatchValidator]);

}

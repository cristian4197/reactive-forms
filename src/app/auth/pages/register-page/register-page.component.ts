import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public myForm:FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    userName: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    // Aqui tenemos acceso a todo los controles del formulario
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(private fb:FormBuilder,
              private validatorsService:ValidatorsService,
              private emailValidator: EmailValidatorService){ }

  isInvalidField(field:string) {
    return this.validatorsService.isInValidField(this.myForm, field);
  }

  onSubmit():void {
    this.myForm.markAllAsTouched();
  }
}

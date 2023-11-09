import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const product = {
  name: 'RTXG-500',
  price: 2500,
  inStorage: 10
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})

export class BasicPageComponent implements OnInit{

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializamos valor con reset
  //  this.myForm.reset(product);
  }

  isInValidField(field:string):boolean | null {
    return this.myForm.controls[field].errors
           && this.myForm.controls[field].touched;
  }

  getFieldError(field:string):string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      console.log(key);
      
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters`;
      }
    }

    return null;
  }

  // public myForm: FormGroup = new FormGroup({
  //   // Valor inicial, validacion sincrona, validacion asincrona
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  onSave():void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    };
    console.log(this.myForm.value);
// Reseteamos y dejamos algunos valores con reset
    this.myForm.reset({
      price: 10,
      inStorage: 0
    });
  }
}

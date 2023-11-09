import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: [
  ]
})
export class DinamicPageComponent {

  // public myForm2:FormGroup = new FormGroup({
  //   favoritesGame: new FormArray([])
  // });


  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGame: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl= new FormControl('', Validators.required);

  constructor(private fb:FormBuilder){ }

  get favoriteGames() {
    return this.myForm.get('favoritesGame') as FormArray;
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

  isInvalidFieldInArray(formaArray:FormArray, index:number):boolean | null {
    return formaArray.controls[index].errors
           && formaArray.controls[index].touched;
  }

  onAddFavorites():void {
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();

  }

  onDeleteFavorite(index: number):void {
    this.favoriteGames.removeAt(index);
   
  }
 
  onSubmit():void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
    
  }

}

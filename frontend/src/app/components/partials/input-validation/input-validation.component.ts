import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE:any={
  required:"should not be Empty",
  email:"Email is not valid",
  minlength:'Field is too short',
  notMatch:'Password and confirmPassword does not match'
}
@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges {
@Input()
control!:AbstractControl;
@Input()
showErrorsWhen:boolean =true

errorMessage:string[]=[];
  constructor() { }


  ngOnChanges(changes:SimpleChanges):void{
this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    })
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }
checkValidation(){
  const errors = this.control.errors;
  if(!errors){
    this.errorMessage = [];
    return;
  }

  const errorKeys = Object.keys(errors);
  this.errorMessage=errorKeys.map(key => VALIDATORS_MESSAGE[key])
}

}

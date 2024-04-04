import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss'
})
export class CompanyEditComponent {

  // formGroup = new FormGroup({
  //   name: new FormControl(''),
  //   phone: new FormControl(''),
  //   email: new FormControl(''),
  // });

  // formGroup = this.fb.group({
  //   name: this.fb.control(''),
  //   phone: this.fb.control(''),
  //   email: this.fb.control(''),
  // });

  formGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  constructor(
    private fb: FormBuilder,
  ) { }
}

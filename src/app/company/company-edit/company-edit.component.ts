import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss'
})
export class CompanyEditComponent implements OnInit {

  companyId!: number;

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
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyId = +this.activatedRoute.snapshot.params['id'];

    // TODO: need to handle add scenario - do not call service

    this.companyService.getCompany(this.companyId)
      .subscribe(company => this.formGroup.patchValue(company));
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    const company = {
      ...this.formGroup.value,
      id: this.companyId,
    } as Company;

    this.companyService.updateCompany(company)
      .subscribe(_ => this.router.navigateByUrl('/company/list'));

    // TODO: handle add scenario
  }
}

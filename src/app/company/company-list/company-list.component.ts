import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable, takeUntil } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;

  constructor(
    private readonly companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  deleteCompany(company: Company) {
    console.log('component - delete company', company);
    this.companyService.deleteCompany(company.id).pipe(
      untilDestroyed(this),
    ).subscribe(_ => this.getCompanies());
  }

  private getCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }
}

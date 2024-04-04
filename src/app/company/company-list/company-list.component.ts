import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable, takeUntil } from 'rxjs';

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

  private getCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }
}

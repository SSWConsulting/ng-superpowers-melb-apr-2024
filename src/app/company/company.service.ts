import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(
    private httpClient: HttpClient,
  ) {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      catchError(this.errorHandler<Company[]>),
    ).subscribe(companies => this.companies$.next(companies));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
    //   catchError(this.errorHandler<Company[]>),
    // );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.errorHandler<Company>),
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company).pipe(
      catchError(this.errorHandler<Company>),
      tap(_ => this.loadCompanies()),
    );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company).pipe(
      catchError(this.errorHandler<Company>),
      tap(_ => this.loadCompanies()),
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    console.log('service - delete company', companyId);
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.errorHandler<Company>),
      tap(_ => this.loadCompanies()),
    );
  }

  // 1. use http interceptor and move this logic to a global handler
  // 2. return an empty observable which means it is completed
  private errorHandler<T>(error: Error): Observable<T> {
    console.error('implement custom error handler here', error);
    return new Observable<T>();
  }
}

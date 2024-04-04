import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTableComponent {
  @Input()
  companies$!: Observable<Company[]>;

  @Output()
  deleteCompany = new EventEmitter<Company>();
}

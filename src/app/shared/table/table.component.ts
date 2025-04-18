import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone:  true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() headers: string[] = [];
  @Input() headersTexto: { [key: string]: string } = {};
  @Input() rows: any[] = [];
  @Input() tableClasses = 'table-striped table-bordered';

  objectKeys = Object.keys;
  
}

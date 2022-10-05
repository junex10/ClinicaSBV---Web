import { Component, Input, ViewEncapsulation, OnChanges, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/shared';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DatatableComponent implements OnChanges {

  @Input('options') options: {} = {};
  @Input('language') language: {} = {};

  @Input('data') data: any[] = [];
  @Input('total') total: number = 0;
  @Input('page') page: number = 1;
  @Input('perPage') perPage: number = Constants.PER_PAGE_WEB;
  @Input('header') header: any[] = ['Example Column 1', 'Example Column 2'];
  @Input('notFoundText') notFoundText: string = 'No hay datos por mostrar';
  @Input('thStyles') thStyles: any = '';
  @Input('thItemsStyles') thItemsStyles: any = '';

  @Output() next = new EventEmitter<number>();
  @Output() toolActionsEvent = new EventEmitter<any>();

  dtOptions: DataTables.Settings = {};

  constructor() { 
    this.dtOptions = {
      pageLength: Constants.PER_PAGE_WEB,
      responsive: true,
      pagingType: 'numbers',
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ Elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
      }
    }
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.dtOptions = {
        ...this.dtOptions,
        ...this.options,
        ...this.language
      }
    }, 600)
  }

  pageChange = (page: any) => {
    this.page = page;
    this.next.emit(page);
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }
  valueAscOrder = (a: any, b: any): number => {
    return a.value.localeCompare(b.value);
  }
  keyDescOrder = (a: any, b: any): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  toolsActions = (action: string, item: any) => this.toolActionsEvent.emit({ action, ...item });
}

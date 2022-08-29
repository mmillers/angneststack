import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableHeaders!: Array<string>;
  @Input() pdfHeaders!: Array<string>;
  @Input() title!: string;
  @Input() buttonAddLabel!: string;
  @Input() buttonAddUrl!: string;
  @Input() dataSource!: Array<any>;
  @Input() service!: any;
  @Output() editEventEmitter = new EventEmitter<any>();
  @Output() viewDetailEventEmitter = new EventEmitter<any>();
  keys!: Array<string>;
  itemSelected: any;
  loading$!: Observable<any>;

  constructor(private readonly _loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subLoadingService();
    this.getKeys();
  }

  subLoadingService() {
    this.loading$ = this._loadingService.loadingSub$;
  }

  getKeys() {
    if (this.dataSource)
      this.keys = Object.keys(this.dataSource[0]);
  }

  edit(item: any) {
    this.editEventEmitter.emit(item);
  }

  view(item: any) {
    this.viewDetailEventEmitter.emit(item);
  }

  exportToPdf() {
    const data = this.createDataToExport();
    const documentDefinition = this.getDocumentDefinition(data);
    pdfMake.createPdf(documentDefinition).download();
  }

  createDataToExport() {
    const data: Array<any> = [...this.dataSource];
    return data.map((obj: any) => {
      const data = Object.values(obj);
      return data.map((item: any) => typeof item !== 'string' ? item.toString() : item);
    });
  }

  getDocumentDefinition(data: any) {
    return {
      defaultStyle: {
        fontSize: 8,
        bold: false,
      },
      info: {
        title: 'PDF EXPORTED',
        author: 'Maximiller Santos',
        subject: 'pdf-export'
      },
      content: [
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            body: [
              this.pdfHeaders,
              ...data,
            ]
          }
        }
      ]
    };
  }
}
